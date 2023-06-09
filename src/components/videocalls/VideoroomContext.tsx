import {
    useMembraneServer,
    useAudioSettings,
    VideoQuality,
    type CaptureDevice,
    useVideoTrackMetadata,
    useAudioTrackMetadata,
    useCameraState,
    useMicrophoneState,
    useScreencast,
    ScreencastQuality,
} from "@jellyfish-dev/react-native-membrane-webrtc";
import { useNotifications } from "../../components/videocalls/model/NotficationContext";

import React, { useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
type VideoroomState = "Normal" | "InMeeting";

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

const VideoroomContextProvider = (props: any) => {
    const SERVER_URL = "https://videoroom.membrane.work/socket";
    const [roomName, setRoomName] = useState("");
    const [username, setUsername] = useState("");
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
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
        useState<VideoroomState>("Normal");

    const connectAndJoinRoom = (async () => {
        try {
            console.log(SERVER_URL, 'server===========')
            console.log(roomName, 'rommname=========');
            await connect(SERVER_URL, roomName, {
            userMetadata: { displayName: username },
            socketChannelParams: {
                isSimulcastOn: true,
            },
            simulcastConfig: {
                enabled: true,
                // a temporary fix for broken screencast on iOS
                // ios devices have a limit on hardware encoders (https://github.com/twilio/twilio-video-ios/issues/17)
                // 3 encoders on the simulcast video track + 1 encoder on the screencast track exceeds the limit
                // so we're using just two layers for now
                // we're going to toggle one layer when turning on screencast but there is a webrtc issue
                // with that that needs to be fixed first
                activeEncodings:
                    Platform.OS === "android" ? ["l", "m", "h"] : ["l", "h"],
            },
            quality: VideoQuality.HD_169,
            maxBandwidth: { l: 150, m: 500, h: 1500 },
            videoTrackMetadata: { active: isCameraOn, type: "camera" },
            audioTrackMetadata: { active: isMicrophoneOn, type: "audio" },
            videoTrackEnabled: isCameraOn,
            audioTrackEnabled: isMicrophoneOn,
            captureDeviceId: currentCamera?.id,
        });
        console.log('conneection Established======');
        await joinRoom();
        console.log('joinedRoom');
        setVideoroomState("InMeeting");
    }
        catch(e){
            console.log(e,'error==========')
            console.warn(e);
        }
       
    });

    const disconnect = useCallback(async () => {
        await membraneDisconnect();
        setVideoroomState("Normal");
    }, []);

    // const { showNotification } = useNotifications();

    useEffect(() => {
        if (error) {
            console.warn("Error connecting to server", "error");
        }
    }, [error]);

    const toggleCamera = useCallback(() => {
        if (videoroomState === "InMeeting") {
            membraneToggleCamera();
            updateVideoTrackMetadata({ active: !isCameraOn, type: "camera" });
        }
        setIsCameraOn(!isCameraOn);
    }, [isCameraOn, videoroomState]);

    const toggleMicrophone = useCallback(() => {
        if (videoroomState === "InMeeting") {
            membraneToggleMicrophone();
            updateAudioTrackMetadata({
                active: !isMicrophoneOn,
                type: "audio",
            });
        }
        setIsMicrophoneOn(!isMicrophoneOn);
    }, [isMicrophoneOn, videoroomState]);

    const toggleScreencastAndUpdateMetadata = useCallback(() => {
        membraneToggleScreencast({
            screencastMetadata: {
                displayName: "presenting",
                type: "screensharing",
                active: "true",
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
        throw new Error(
            "useVideoroomState must be used within a VideoroomContext"
        );
    }
    return context;
}

export { VideoroomContextProvider, useVideoroomState };
