import { BrandColors, AdditionalColors, TextColors } from "../shared/colors";
import * as Membrane from "@jellyfish-dev/react-native-membrane-webrtc";
import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    withSequence,
    withDelay,
    runOnJS,
} from "react-native-reanimated";

import { NoCameraView } from "./NoCameraView";
import { Typo } from "./Typo";
import { PinButton } from "./buttons/PinButton";


type RoomParticipantProps = {
    participant: Membrane.Participant;
    trackId?: string;
    onPinButtonPressed?: (string:any) => void;
    focused?: boolean;
    pinButtonHiddden?: boolean;
    tileSmall?: boolean;
  };
  
  export const RoomParticipant = ({
    participant,
    trackId,
    onPinButtonPressed = (string) => {},
    focused = false,
    pinButtonHiddden = false,
    tileSmall = false,
  }: RoomParticipantProps) => {
    const { metadata, tracks, type } = participant;
  
    const [showPinButton, setShowPinButton] = useState(false);
    const isPinButtonShown = useRef(false);
  
    const videoTrack = trackId ? tracks.find((t) => t.id === trackId) : null;
    const videoTrackType = videoTrack?.metadata.type;
    const audioTrack = tracks.find((t) => t.type === 'Audio');
    const buttonOpacity = useSharedValue(0);
  
    const participantHasVideo = () => {
      if (videoTrack) {
        return videoTrack.metadata.active;
      }
      return false;
    };
  
    const getTextForPinButton = () => {
      return focused ? 'Unpin user' : tileSmall ? 'Pin' : 'Pin user';
    };
  
    const onPinButton = () => {
      if (focused) {
        onPinButtonPressed(null);
        return;
      }
      onPinButtonPressed({ participant, trackId });
    };
  
    const opacityStyle = useAnimatedStyle(() => {
      return {
        opacity: buttonOpacity.value,
      };
    });
  
    const setIsPinButtonShown = (val: boolean) => {
      isPinButtonShown.current = val;
    };
  
    const triggerShowingPinButton = async () => {
      if (pinButtonHiddden || isPinButtonShown.current) {
        return;
      }
  
      isPinButtonShown.current = true;
      setShowPinButton(true);
  
      buttonOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withDelay(
          1700,
          withTiming(0, { duration: 300 }, () => {
            runOnJS(setShowPinButton)(false);
            runOnJS(setIsPinButtonShown)(false);
          })
        )
      );
    };
  
    const getStyleForVideoView = () => {
      return videoTrackType === 'camera'
        ? focused
          ? styles.videoTrackFocused
          : styles.videoTrack
        : focused
        ? styles.videoTrackScreencastFocused
        : styles.videoTrack;
    };
  
    return (
      <View style={styles.fill}>
        <Pressable onPress={triggerShowingPinButton} style={styles.fill}>
          {participantHasVideo() ? (
            <Membrane.VideoRendererView
              trackId={videoTrack!.id}
              style={getStyleForVideoView()}
              videoLayout={
                videoTrackType === 'camera'
                  ? Membrane.VideoLayout.FILL
                  : Membrane.VideoLayout.FIT
              }
            />
          ) : (
            <View style={styles.videoTrack}>
              <NoCameraView
                username={metadata.displayName}
                isSmallTile={tileSmall}
              />
            </View>
          )}
          <View style={styles.displayNameContainer}>
            <View
              style={[
                styles.displayName,
                type === 'Local' ? styles.localUser : styles.remoteUser,
              ]}
            >
              <Typo variant="label" color={TextColors.white} numberOfLines={1}>
                {type === 'Local' ? 'You' : metadata.displayName}
              </Typo>
            </View>
          </View>
  
          {focused ? (
            <View style={styles.displayPinContainer}>
             <Image
                            source={require("@assets/images/pin.png")}
                            style={{
                                tintColor: BrandColors.darkBlue100,
                                height: 20,
                                width: 20,
                            }}
                        />
            </View>
          ) : null}
  
          {videoTrackType !== 'screensharing' && !audioTrack?.metadata.active && (
            <View style={styles.mutedIcon}>
               <Image
                                source={require("@assets/images/micClose.png")}
                                style={{
                                    tintColor: BrandColors.darkBlue100,
                                    height: 16,
                                    width: 16,
                                }}
                            />
            </View>
          )}
        </Pressable>
  
        {/* {isDevMode ? (
          <View style={styles.simulcastMenu}>
            <SimulcastMenu type={type} encoding={videoTrack?.encoding} />
          </View>
        ) : null} */}
  
        {showPinButton ? (
          <Animated.View style={[styles.pinButton, opacityStyle]}>
            <View style={styles.pinButtonWrapper}>
            <PinButton onPress={onPinButton} focused={focused}>
                            {getTextForPinButton()}
                        </PinButton>
            </View>
          </Animated.View>
        ) : null}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    fill: {
      flex: 1,
      width: '100%',
    },
    displayNameContainer: {
      borderRadius: 60,
      position: 'absolute',
      left: 16,
      bottom: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    remoteUser: {
      backgroundColor: BrandColors.darkBlue80,
    },
    localUser: {
      backgroundColor: BrandColors.pink100,
    },
    displayName: {
      borderRadius: 60,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      marginRight: 16,
    },
    videoTrack: {
      flex: 1,
      aspectRatio: 1,
      alignSelf: 'center',
    },
    videoTrackFocused: {
      flex: 1,
      width: '100%',
    },
    videoTrackScreencastFocused: {
      flex: 1,
    },
    mutedIcon: {
      position: 'absolute',
      left: 16,
      top: 16,
      backgroundColor: AdditionalColors.white,
      borderRadius: 50,
      padding: 6,
    },
    pinButtonWrapper: {
      borderRadius: 100,
      overflow: 'hidden',
    },
    pinButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayPinContainer: {
      borderRadius: 60,
      position: 'absolute',
      top: 16,
      right: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AdditionalColors.white,
      padding: 4,
    },
    simulcastMenu: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  });