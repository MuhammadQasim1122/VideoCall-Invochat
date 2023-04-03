import { BrandColors } from '../shared/colors';
import { BackgroundAnimation } from '../components/BackgroundAnimation';

import { NotFocusedParticipants } from '../components/NotFocusedParticipants';
import { OtherParticipants } from '../components/OtherParticipants';
import { RoomParticipant } from '../components/RoomParticipant';
import { Typo } from '../components/Typo';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Dimensions, InteractionManager, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from '../VideoroomContext';

import { CallControls } from '../components/CallControls';

const HEADER_AND_FOOTER_SIZE = 126;
const OFFSET_PER_ROW = 16;
const MAX_NUM_OF_USERS_ON_THE_SCREEN = 8;
const FLEX_BRAKPOINT = 3;

export const Room = () => {
  const { width, height } = Dimensions.get('window');
  const { roomName } = useVideoroomState();

  const participants = Membrane.useRoomParticipants();
  const [focusedParticipantId, setFocusedParticipantId] = useState<
    string | null
  >(null);
  const focusedParticipant = participants.find(
    (p) => p.id === focusedParticipantId
  );

  const rowNum = Math.min(
    Math.ceil(participants.length / 2),
    MAX_NUM_OF_USERS_ON_THE_SCREEN / 2
  );

  const [shouldShowParticipants, setShouldShowParticipants] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        setShouldShowParticipants(true);
      });

      return () => setShouldShowParticipants(false);
    }, [])
  );

  const videoViewWidth = (width - 3 * OFFSET_PER_ROW) / 2;
  const smallScreenVideoWidth =
    (height - HEADER_AND_FOOTER_SIZE - OFFSET_PER_ROW * (rowNum + 2)) / rowNum;

  const switchCamera = useCallback(() => {
    Membrane.flipCamera();
  }, []);

  const getWidthWhenManyParticipants = () => {
    return Math.min(videoViewWidth, smallScreenVideoWidth);
  };

  const getStylesForParticipants = (participants: Membrane.Participant[]) => {
    return [
      styles.participant,
      participants.length > FLEX_BRAKPOINT
        ? {
            width: getWidthWhenManyParticipants(),
          }
        : {
            flex: 1,
            maxHeight: width - 2 * OFFSET_PER_ROW,
            maxWidth: width - 2 * OFFSET_PER_ROW,
          },
    ];
  };

  return (
    <BackgroundAnimation>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Typo variant="h4">{roomName}</Typo>
            </View>
            <View style={styles.headerIcon}>
              <TouchableOpacity onPress={switchCamera}>
              <Image
                                                source={require("../../assets/images/camSwtich.png")}
                                                style={{height:20, width:20}}
                                            />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            {shouldShowParticipants && (
              <>
                {focusedParticipant ? (
                  <View style={styles.focusedParticipantContainer}>
                    <View style={styles.focusedParticipant}>
                      <RoomParticipant
                        participant={focusedParticipant}
                        onPinButtonPressed={setFocusedParticipantId}
                        focused
                      />
                    </View>
                  </View>
                ) : null}

                {focusedParticipant ? (
                  <View style={styles.otherParticipants}>
                    <NotFocusedParticipants
                      participants={participants.filter(
                        (p) => p.id !== focusedParticipant?.id
                      )}
                    />
                  </View>
                ) : (
                  <View style={styles.participantsContainer}>
                    <View
                      style={[
                        styles.inner,
                        participants.length > FLEX_BRAKPOINT
                          ? styles.row
                          : styles.column,
                      ]}
                    >
                      {participants
                        .slice(
                          0,
                          participants.length > MAX_NUM_OF_USERS_ON_THE_SCREEN
                            ? MAX_NUM_OF_USERS_ON_THE_SCREEN - 1
                            : MAX_NUM_OF_USERS_ON_THE_SCREEN
                        )
                        .map((p) => (
                          <View
                            key={p.id}
                            style={[
                              getStylesForParticipants(participants),
                              styles.shownParticipantBorder,
                            ]}
                          >
                            {/* <RoomParticipant
                              participant={p}
                              onPinButtonPressed={setFocusedParticipantId}
                              tileSmall={participants.length > FLEX_BRAKPOINT}
                            /> */}
                          </View>
                        ))}

                      {participants.length > MAX_NUM_OF_USERS_ON_THE_SCREEN && (
                        <View style={getStylesForParticipants(participants)}>
                          <OtherParticipants
                            p1={participants[participants.length - 1]}
                            p2={participants[participants.length - 2]}
                            numOfOtherParticipants={
                              participants.length -
                              MAX_NUM_OF_USERS_ON_THE_SCREEN +
                              1
                            }
                          />
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </>
            )}
          </View>

          <CallControls />
        </SafeAreaView>
      </View>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.seaBlue20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 60,
    width: '100%',
  },
  headerTitle: {
    marginLeft: 16,
  },
  headerIcon: {
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 'auto',
  },
  flex: {
    flex: 1,
  },
  participantsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  inner: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  participant: {
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  shownParticipantBorder: {
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
  },
  focusedParticipantContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  focusedParticipant: {
    aspectRatio: 1 / 1.3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
    overflow: 'hidden',
    width: '100%',
  },
  otherParticipants: {
    marginTop: 16,
    marginBottom: 8,
    flex: 1,
  },
});
