
import type { RootStack } from "../../components/videocalls/model/NavigationTypes";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Room } from "../../screens/video_call/room/Room";
import React, { useEffect, useState } from "react";

import { useVideoroomState } from "../../components/videocalls/VideoroomContext";
import { JoinRoom } from "./JoinRoom";
// import { type AvailableScreens } from "@typings/screens/navigation";
// import { CallOptions } from "./CallOptions";
const VIDEOROOM_URL = 'https://videoroom.membrane.work/room/'
const linking = {
    prefixes: [VIDEOROOM_URL],
    config: {
      initialRouteName: 'JoinRoom' as const,
      screens: {
        InitialScreen: {},
        JoinRoom: {
          path: ':roomName',
          parse: {
            roomName: decodeURI,
          },
        },
      },
    },
    // a hack - reset the stack instead of navigating
    getActionFromState: () => {
      return undefined;
    },
  };

const Stack = createStackNavigator<RootStack>();
type VideoCallProps = {
    componentId?: any;
    channelId?: any;
    userName: string;
    channel: any;
};
export const Navigation = ({
    componentId,
    channelId,
    userName,
    channel,
}: VideoCallProps) => {
    const [isRoomNameInputEditable, setIsRoomNameInputEditable] =
        useState(true);
    const { setRoomName, setUsername, videoroomState } = useVideoroomState();
    useEffect(() => {
        console.log(channelId, '--------');
        if (isRoomNameInputEditable) {
            setUsername(userName);
            setRoomName(channelId);
            setIsRoomNameInputEditable(false);
        }
    }, [userName, channelId]);

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="JoinRoom">
                {videoroomState === "InMeeting" ? (
                    <>
                        <Stack.Screen
                            name="Room"
                            component={Room}
                            options={{
                                headerShown: false,
                            }}
                            initialParams={{
                                id: componentId,
                                // channel: channel,
                            }}
                        />
                        {/* <Stack.Screen
                            name="CallOptions"
                            component={CallOptions}
                            options={{
                                headerShown: false,
                            }}
                        /> */}
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="JoinRoom"
                            component={JoinRoom}
                            options={{
                                headerShown: false,
                            }}
                            initialParams={{
                                id: componentId,
                                // channel: channel,
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigation;
