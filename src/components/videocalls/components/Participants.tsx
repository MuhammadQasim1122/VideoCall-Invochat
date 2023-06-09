import { AdditionalColors, BrandColors } from '../shared/colors';
import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

import type { Participant } from './NotFocusedParticipants';
import { OtherParticipants } from './OtherParticipants';
import { RoomParticipant } from './RoomParticipant';


const HEADER_AND_FOOTER_SIZE = 126;
const MAX_NUM_OF_USERS_ON_THE_SCREEN = 8;
const OFFSET_PER_ROW = 16;
const FLEX_BRAKPOINT = 3;

type ParticipantsProp = {
  participants: Participant[];
  onPress: (string:any) => void;
};

export const Participants = ({ participants, onPress }: ParticipantsProp) => {
  const { width, height } = Dimensions.get('window');

  const numberOfRows = Math.min(
    Math.ceil(participants.length / 2),
    MAX_NUM_OF_USERS_ON_THE_SCREEN / 2
  );

  const videoViewWidth = (width - 3 * OFFSET_PER_ROW) / 2;
  const smallScreenVideoWidth =
    (height - HEADER_AND_FOOTER_SIZE - OFFSET_PER_ROW * (numberOfRows + 2)) /
    numberOfRows;

  const getWidthWhenManyParticipants = () => {
    return Math.min(videoViewWidth, smallScreenVideoWidth);
  };

  const getStylesForParticipants = () => {
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
    <View style={styles.participantsContainer}>
      <View
        style={[
          styles.inner,
          participants.length > FLEX_BRAKPOINT ? styles.row : styles.column,
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
              key={p.participant.id + p.trackId}
              style={[
                getStylesForParticipants(),
                styles.shownParticipantBorder,
              ]}
            >
              <RoomParticipant
                participant={p.participant}
                trackId={p.trackId}
                onPinButtonPressed={onPress}
                tileSmall={participants.length > FLEX_BRAKPOINT || width < 350}
              />
            </View>
          ))}

        {participants.length > MAX_NUM_OF_USERS_ON_THE_SCREEN && (
          <View style={getStylesForParticipants()}>
            <OtherParticipants
              p1={participants[participants.length - 1].participant}
              p2={participants[participants.length - 2].participant}
              numOfOtherParticipants={
                participants.length - MAX_NUM_OF_USERS_ON_THE_SCREEN + 1
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: AdditionalColors.grey140,
  },
  shownParticipantBorder: {
    borderWidth: 1,
    borderColor: BrandColors.darkBlue60,
  },
});