import { BackgroundAnimation } from "../../components/videocalls/components/BackgroundAnimation";

import type { RootStack } from "../../components/videocalls/model/NavigationTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
    checkIfUrl,
    extractRoomNameFromUrl,
} from "../../components/videocalls/shared/utils";
import React, { useCallback, useEffect, useRef} from "react";
import { useNotifications } from '../../components/videocalls/model/NotficationContext';
import * as Membrane from '@jellyfish-dev/react-native-membrane-webrtc';

import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoroomState } from "../../components/videocalls/VideoroomContext";
import { handlePermissions } from "../../components/videocalls/shared/handlePermissions";
import { Button } from "react-native";

type Props = NativeStackScreenProps<RootStack, "JoinRoom">;

export const JoinRoom = (props:Props) => {
    const { roomName, setRoomName, connectAndJoinRoom, currentCamera,
        setCurrentCamera, } = useVideoroomState();
    
    const availableCameras = useRef<Membrane.CaptureDevice[]>([]);
    useEffect(() => {
        Membrane.getCaptureDevices().then((devices) => {
          availableCameras.current = devices;
          setCurrentCamera(devices.find((device) => device.isFrontFacing) || null);
        });
      }, []);
    const { showNotification } = useNotifications();
   
    const openPreview = () => {
        console.log("openPreview");
        console.log(roomName);
        if (checkIfUrl(roomName)) {
        setRoomName(decodeURI(extractRoomNameFromUrl(roomName)));
        }
        onConnectPress();
    };
    const onConnectPress = useCallback(async () => {
        try {
          await connectAndJoinRoom();
          props.navigation.navigate("Room", {id: props.route.params.id});
        } catch (err) {
          showNotification('Error connecting to server', 'error');
        }
      }, [connectAndJoinRoom]);

    return (
        <BackgroundAnimation>
            <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
                <Button
                    onPress={() => {
                        handlePermissions(openPreview);
                    }}
                    title={"Join Call"}
                ></Button>
            </SafeAreaView>
        </BackgroundAnimation>
    );
};
