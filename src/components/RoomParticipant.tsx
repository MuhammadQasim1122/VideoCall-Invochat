import { BrandColors, AdditionalColors, TextColors } from '../shared/colors';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Image, Animated } from 'react-native';


import { NoCameraView } from './NoCameraView';
import { Typo } from './Typo';
import { PinButton } from './buttons/PinButton';


type RoomParticipantProps = {
  participant: Membrane.Participant;
  onPinButtonPressed?: (string:any) => void;
  focused?: boolean;
  pinButtonHiddden?: boolean;
  tileSmall?: boolean;
};

export const RoomParticipant = ({
  participant: { metadata, tracks, type, id },
  onPinButtonPressed = (string) => {},
  focused = false,
  pinButtonHiddden = false,
  tileSmall = false,
}: RoomParticipantProps) => {
  const [showPinButton, setShowPinButton] = useState(false);
  const videoTrack = tracks.find((t) => t.type === 'Video');
  const audioTrack = tracks.find((t) => t.type === 'Audio');

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
    onPinButtonPressed(id);
  };



  const triggerShowingPinButton = async () => {
    showPinButton ? setShowPinButton(true) : setShowPinButton(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={triggerShowingPinButton} style={{ flex: 1 }}>
        {participantHasVideo() ? (
          <Membrane.VideoRendererView
            trackId={videoTrack!.id}
            style={styles.videoTrack}
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
                                                source={require("../../assets/images/pin.png")}
                                                style={{tintColor:BrandColors.darkBlue100,height:20, width:20}}
                                            />
          </View>
        ) : null}

        {!audioTrack?.metadata.active && (
          <View style={styles.mutedIcon}>
              <Image
                                                source={require("../../assets/images/micClose.png")}
                                                style={{tintColor:BrandColors.darkBlue100,height:16, width:16}}
                                            />
            
          </View>
        )}
      </Pressable>
      {showPinButton ? (
        <Animated.View style={[styles.pinButton, {opacity: 0}]}>
          <View style={styles.pinButtonWrapper}>
            <PinButton onPress={onPinButton}>{getTextForPinButton()}</PinButton>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
