
// import { useServerUrl } from '@app/context/server';
// import { getCurrentUserId } from '@app/queries/servers/system';
// import { observeCurrentUser } from '@app/queries/servers/user';
// import DatabaseManager from '@database/manager';
import {
  useMembraneServer,
  useAudioSettings,
  VideoQuality,
  CaptureDevice,
  useVideoTrackMetadata,
  useAudioTrackMetadata,
  useCameraState,
  useMicrophoneState,
  useScreencast,
  ScreencastQuality,
} from '@jellyfish-dev/react-native-membrane-webrtc';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
// import {of as of$} from 'rxjs';
// import {switchMap} from 'rxjs/operators';

type VideoroomState = 'BeforeMeeting' | 'InMeeting' | 'AfterMeeting';

const VideoroomContext = React.createContext<
  | {
      roomName: string;
      setRoomName: (roomName: string) => void;
      username: string;
      setUsername: (username: string) => void;
      isCameraOn: boolean;
      toggleCamera: () => void;
      isMicrophoneOn: boolean;
      toggleMicrophone: () => void;
      isScreencastOn: boolean;
      toggleScreencastAndUpdateMetadata: () => void;
      currentCamera: CaptureDevice | null;
      setCurrentCamera: (camera: CaptureDevice | null) => void;
      connectAndJoinRoom: () => Promise<void>;
      disconnect: () => Promise<void>;
      videoroomState: VideoroomState;
    }
  | undefined
>(undefined);

const VideoroomContextProvider = (props:any) => {
  // const serverUrl = useServerUrl();
  // const {database} = DatabaseManager.getServerDatabaseAndOperator(serverUrl);
  const SERVER_URL = 'https://videoroom.invo.zone/socket';
  const [roomName, setRoomName] = useState('asdf');
  const [username, setUsername] = useState('Test');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [currentCamera, setCurrentCamera] = useState<CaptureDevice | null>(
    null
  );
  const { toggleCamera: membraneToggleCamera } = useCameraState();
  const { toggleMicrophone: membraneToggleMicrophone } = useMicrophoneState();
  const { isScreencastOn, toggleScreencast: membraneToggleScreencast } =
    useScreencast();

  const {
    connect,
    joinRoom,
    error,
    disconnect: membraneDisconnect,
  } = useMembraneServer();
  useAudioSettings();

  const { updateVideoTrackMetadata } = useVideoTrackMetadata();
  const { updateAudioTrackMetadata } = useAudioTrackMetadata();

  const [videoroomState, setVideoroomState] =
    useState<VideoroomState>('BeforeMeeting');

  // const getCurrentUserName = () => {
  //   const currentUser = observeCurrentUser(database);
  //   return currentUser.pipe((switchMap((user) => of$(user?.username))))
  // }
  const connectAndJoinRoom = useCallback(async () => {
    const userId = 'Muhammad Qasim';
    // const roomId = await getCurrentUserId(database);
    
    await connect(SERVER_URL, roomName, {
      userMetadata: { displayName: username },
      socketChannelParams: {
        isSimulcastOn: true,
      },
      simulcastConfig: {
        enabled: true,
        activeEncodings: ['l', 'm', 'h'],
      },
      quality: VideoQuality.HD_169,
      maxBandwidth: { l: 150, m: 500, h: 1500 },
      videoTrackMetadata: { active: isCameraOn, type: 'camera' },
      audioTrackMetadata: { active: isMicrophoneOn, type: 'audio' },
      videoTrackEnabled: isCameraOn,
      audioTrackEnabled: isMicrophoneOn,
      captureDeviceId: currentCamera?.id,
    });
    await joinRoom();
    setVideoroomState('InMeeting');
  }, [roomName, username, isCameraOn, isMicrophoneOn, currentCamera]);

  const disconnect = useCallback(async () => {
    await membraneDisconnect();
    setVideoroomState('AfterMeeting');
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert('Error when connecting to server:', error);
    }
  }, [error]);

  const toggleCamera = useCallback(() => {
    if (videoroomState === 'InMeeting') {
      membraneToggleCamera();
      updateVideoTrackMetadata({ active: !isCameraOn, type: 'camera' });
    }
    setIsCameraOn(!isCameraOn);
  }, [isCameraOn, videoroomState]);

  const toggleMicrophone = useCallback(() => {
    if (videoroomState === 'InMeeting') {
      membraneToggleMicrophone();
      updateAudioTrackMetadata({ active: !isMicrophoneOn, type: 'audio' });
    }
    setIsMicrophoneOn(!isMicrophoneOn);
  }, [isMicrophoneOn, videoroomState]);

  const toggleScreencastAndUpdateMetadata = useCallback(() => {
    membraneToggleScreencast({
      screencastMetadata: {
        displayName: 'presenting',
        type: 'screensharing',
        active: 'true',
      },
      quality: ScreencastQuality.HD15,
    });
  }, []);

  const value = {
    roomName,
    setRoomName,
    username,
    setUsername,
    connectAndJoinRoom,
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone,
    isScreencastOn,
    toggleScreencastAndUpdateMetadata,
    currentCamera,
    setCurrentCamera,
    disconnect,
    videoroomState,
  };

  return (
    <VideoroomContext.Provider value={value}>
      {props.children}
    </VideoroomContext.Provider>
  );
};

function useVideoroomState() {
  const context = React.useContext(VideoroomContext);
  if (context === undefined) {
    throw new Error('useRoomName must be used within a VideoroomContext');
  }
  return context;
}

export { VideoroomContextProvider, useVideoroomState };
