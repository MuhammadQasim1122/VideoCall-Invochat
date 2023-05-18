import React from "react";
import { View, Image } from "react-native";
// import Button from "../../components/videocalls/components/buttons/";

// import { Navigation } from "react-native-navigation";
import { Typo } from "./components/Typo";
// import { goToScreen } from "@app/screens/navigation";
// import { Screens } from "@app/constants";
// import { preventDoubleTap } from "@app/utils/tap";

type RecieveModalProps = {
    channelId: string;
    senderName: String;
    title: string;
    // theme: Theme;
};

export const RecieveModal = ({
    channelId,
    senderName,
    title,
    // theme,
}: RecieveModalProps) => {
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Typo variant="h4">{senderName} is calling you</Typo>

            {/* <Image
                source={require("@assets/images/serverLogo.png")}
                style={{
                    marginVertical: 30,
                    width: 75,
                    height: 75,
                }}
            /> */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {/* <Button
                    onPress={() => {
                        Navigation.dismissAllModals();
                    }}
                    text="Cancel"
                    theme={theme}
                    buttonType="destructive"
                />
                <View style={{ width: 50 }}></View>
                <Button
                    onPress={preventDoubleTap(() => {
                        goToScreen(
                            Screens.VIDEOCALL,
                            "VideoCall",
                            {
                                channelId: channelId,
                                userName: title,
                            },
                            { topBar: { visible: false } }
                        );
                    })}
                    text="Join call"
                    theme={theme}
                /> */}
            </View>
        </View>
    );
};
