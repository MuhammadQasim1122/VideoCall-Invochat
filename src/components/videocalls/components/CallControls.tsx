// import useAndroidHardwareBackHandler from "@app/hooks/android_back_handler";
// import { dismissBottomSheet, popTopScreen } from "@app/screens/navigation";
// import { AvailableScreens } from "@typings/screens/navigation";
import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import { Navigation } from "react-native-navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useVideoroomState } from "../VideoroomContext";

const BOTTOM_MARGIN = 34;
type callControlsProps = {
    componentId?: any;
};
export const CallControls = ({ componentId }: callControlsProps) => {
    const {
        isCameraOn,
        toggleCamera,
        isMicrophoneOn,
        toggleMicrophone,
        isScreencastOn,
        toggleScreencastAndUpdateMetadata,
        disconnect,
    } = useVideoroomState();
    const bottomOffset = useSafeAreaInsets().bottom;
    const onDisconnectPress = useCallback(async () => {
        await disconnect();
    }, [disconnect]);
    // const onDisconnectPress = useCallback(async () => {
    //     dismissBottomSheet();
    //     popTopScreen(componentId);
    //     console.log("disconnecting");
    //     await disconnect();
    //     console.log("disconnected");
    // }, [disconnect, componentId]);
    return (
        <View
            style={[
                styles.iconsContainer,
                { marginBottom: BOTTOM_MARGIN - bottomOffset },
            ]}
        >
            <View style={styles.iconInRow}>
                {
                    <TouchableOpacity onPress={toggleCamera}>
                        <Image
                            source={
                                isCameraOn
                                    ? require("@assets/images/camOpen.png")
                                    : require("@assets/images/camClose.png")
                            }
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.iconInRow}>
                {
                    <TouchableOpacity onPress={toggleMicrophone}>
                        <Image
                            source={
                                isMicrophoneOn
                                    ? require("@assets/images/micOpen.png")
                                    : require("@assets/images/micClose.png")
                            }
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.iconInRow}>
                {
                    <TouchableOpacity
                        onPress={toggleScreencastAndUpdateMetadata}
                    >
                        <Image
                            source={
                                !isScreencastOn
                                    ? require("@assets/images/screenshare.png")
                                    : require("@assets/images/cancelScreenShare.png")
                            }
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                }
            </View>
            {
                <TouchableOpacity onPress={onDisconnectPress}>
                    <Image
                        source={require("@assets/images/call-end.png")}
                        style={{ height: 30, width: 30 }}
                    />
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    iconsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
    },
    iconInRow: {
        marginRight: 16,
    },
});
