import { BackgroundAnimation } from "../../../components/videocalls/components/BackgroundAnimation";
import { FocusedParticipant } from "../../../components/videocalls/components/FocusedParticipants";
import {
    NotFocusedParticipants,
    type Participant,
} from "../../../components/videocalls/components/NotFocusedParticipants";
import { Participants } from "../../../components/videocalls/components/Participants";
import * as Membrane from "@jellyfish-dev/react-native-membrane-webrtc";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, InteractionManager, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useVideoroomState } from "../../../components/videocalls/VideoroomContext";
// import { useTheme } from "@context/theme";

import { CallControls } from "../../../components/videocalls/components/CallControls";
import { DiscardModal } from "../../../components/videocalls/components/DiscardModal";
// import { popTopScreen } from "@app/screens/navigation";

// import useAndroidHardwareBackHandler from "@app/hooks/android_back_handler";
// import { Navigation } from "react-native-navigation";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { type RootStack } from "../../../components/videocalls/model/NavigationTypes";
import { BrandColors } from "../../../components/videocalls/shared/colors";
import VideoCallHeader from "../../../components/videocalls/components/VideoCallHeader";

type Props = NativeStackScreenProps<RootStack, "Room">;

export const Room = (props: any) => {
    // const theme = useTheme();
    const { roomName, disconnect } = useVideoroomState();
    console.log('roommName in Romm==', roomName);
    const participants = Membrane.useRoomParticipants();
  const [focusedParticipantData, setFocusedParticipantData] =
    useState<Participant | null>(null);

  const participantsWithTracks = participants
    .map((p) => {
      if (p.tracks.some((t) => t.type === Membrane.TrackType.Video)) {
        return p.tracks
          .filter((t) => t.metadata.type !== 'audio')
          .map((t) => ({
            participant: p,
            trackId: t.id,
          }));
      }
      return { participant: p };
    })
    .flat();

  const [shouldShowParticipants, setShouldShowParticipants] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      InteractionManager.runAfterInteractions(() => {
        setShouldShowParticipants(true);
      });

      return () => setShouldShowParticipants(false);
    }, [])
  );

  const isScreensharingTrack = (track: Membrane.Track) => {
    return track.metadata.type === 'screensharing';
  };

  const isTrackFocused = (p: Participant) => {
    return (
      p.participant.id === focusedParticipantData?.participant.id &&
      p.trackId === focusedParticipantData?.trackId
    );
  };

  useEffect(() => {
    const curretStateOfFocusedParticipant = participants.find(
      (p) => p.id === focusedParticipantData?.participant.id
    );

    if (!curretStateOfFocusedParticipant) {
      setFocusedParticipantData(null);
      return;
    }

    if (
      focusedParticipantData?.participant !== curretStateOfFocusedParticipant
    ) {
      setFocusedParticipantData({
        participant: curretStateOfFocusedParticipant,
        trackId: focusedParticipantData?.trackId,
      });
    }
  }, [participants]);

  useEffect(() => {
    const screencast = participants
      .reverse()
      .find((p) => p.tracks.some((t) => isScreensharingTrack(t)));

    if (screencast) {
      setFocusedParticipantData({
        participant: screencast,
        trackId: screencast.tracks.find((t) => isScreensharingTrack(t))!.id,
      });
    } else {
      setFocusedParticipantData(null);
    }
  }, [
    participants.filter((p) => p.tracks.some((t) => isScreensharingTrack(t)))
      .length,
  ]);

//   const switchCamera = useCallback(() => {
//     Membrane.flipCamera();
//   }, []);
// const options = useCallback(() => {
//     props.navigation.push("CallOptions", {
//         participants: participants,
//         componentId: "call-options",
//     });
// }, [participants, theme]);

  const handleBeforeRemoveEvent = (e:any, setIsModalVisible:any) => {
    e.preventDefault();
    // reset action comes from deeplink
    if (e.data.action.type === 'RESET') {
      setIsModalVisible(true);
    }
  };


    // const handleBack = useCallback(async () => {
    //     await disconnect();
    //     Navigation.dismissAllModals();
    //     popTopScreen(props.route.params.id);
    // }, [props.route.params.id]);
    // useAndroidHardwareBackHandler(props.route.params.id, handleBack);

    return (
        <BackgroundAnimation>
            <DiscardModal
                headline="Leave room"
                body="Are you sure you want to leave this room?"
                buttonText="Yes, leave room"
                handleBeforeRemoveEvent={handleBeforeRemoveEvent}
                onDiscard={disconnect}
            />
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
                    {/* <VideoCallHeader
                        channel={props.route.params.channel}
                        onParticpantsPressed={options}
                        handleBackPress={handleBack}
                        theme={theme}
                        memberCount={participants.length}
                    /> */}

                    <View style={{ flex: 1 }}>
                        {shouldShowParticipants &&
                            (focusedParticipantData ? (
                                <>
                                    <FocusedParticipant
                                        focusedParticipant={
                                            focusedParticipantData
                                        }
                                        onPress={setFocusedParticipantData}
                                    />
                                    <View style={styles.otherParticipants}>
                                        <NotFocusedParticipants
                                            participants={participantsWithTracks.filter(
                                                (p) => !isTrackFocused(p)
                                            )}
                                        />
                                    </View>
                                </>
                            ) : (
                                <Participants
                                    participants={participantsWithTracks}
                                    onPress={setFocusedParticipantData}
                                />
                            ))}
                    </View>

                    {/* {isDevMode ? (
            <View style={styles.audioDeviceContainer}>
              <Typo variant="label">
                Currently using: {selectedAudioOutputDevice?.name} of type:
                {selectedAudioOutputDevice?.type}
              </Typo>
            </View>
          ) : null} */}
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
        flexDirection: "row",
        marginTop: 60,
        width: "100%",
    },
    headerTitle: {
        marginLeft: 16,
    },
    headerIcon: {
        justifyContent: "center",
        marginRight: 15,
        marginLeft: "auto",
    },
    flex: {
        flex: 1,
    },
    otherParticipants: {
        marginTop: 16,
        marginBottom: 8,
    },
    audioDeviceContainer: {
        alignItems: "center",
    },
});
