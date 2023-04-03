
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';
import { RootStack } from '../model/NavigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoroomState } from '../VideoroomContext';

const BOTTOM_MARGIN = 34;

export const CallControls = () => {
  const { isScreencastOn, toggleScreencast } = Membrane.useScreencast();
  const {
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone,
    disconnect,
  } = useVideoroomState();
  const bottomOffset = useSafeAreaInsets().bottom;

  const toggleScreencastAndUpdateMetadata = () => {
    toggleScreencast({
      screencastMetadata: {
        displayName: 'presenting',
        type: 'screensharing',
        active: 'true',
      },
      quality: Membrane.ScreencastQuality.FHD30,
    });
  };

  const navigation = useNavigation<StackNavigationProp<RootStack, 'Room'>>();

  const onDisconnectPress = useCallback(async () => {
    await disconnect();
    navigation.navigate('LeaveRoom');
  }, [disconnect]);

  return (
    <View
      style={[
        styles.iconsContainer,
        { marginBottom: BOTTOM_MARGIN - bottomOffset },
      ]}
    >
      <View style={styles.iconInRow}>
      {<TouchableOpacity onPress={toggleCamera}>
              <Image
                                                source={isCameraOn ? require("../../assets/images/camOpen.png") : require("../../assets/images/camClose.png")}
                                                style={{height:20, width:20}}
                                            />
              </TouchableOpacity>}
      </View>
      <View style={styles.iconInRow}>
      {<TouchableOpacity onPress={toggleMicrophone}>
              <Image
                                                source={isMicrophoneOn ? require("../../assets/images/micOpen.png") : require("../../assets/images/micClose.png")}
                                                style={{height:20, width:20}}
                                            />
              </TouchableOpacity>}
      </View>
      <View style={styles.iconInRow}>
        {<TouchableOpacity onPress={toggleScreencastAndUpdateMetadata}>
              <Image
                                                source={!isScreencastOn ? require("../../assets/images/camOpen.png") : require("../../assets/images/camClose.png")}
                                                style={{height:20, width:20}}
                                            />
              </TouchableOpacity>}
      </View>
      {<TouchableOpacity onPress={onDisconnectPress}>
              <Image
                                                source={require("../../assets/images/settings.png")}
                                                style={{height:20, width:20}}
                                            />
              </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  iconInRow: {
    marginRight: 16,
  },
});