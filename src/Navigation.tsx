import { RootStack } from './model/NavigationTypes';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useVideoroomState } from './VideoroomContext';
import { VideoCall } from '@screens/VideoCall';
import { StartCall } from './screens';
const VIDEOROOM_URL = 'https://videoroom.invo.zone/room/'
const linking = {
  prefixes: [VIDEOROOM_URL],
  config: {
    screens: {
      JoinRoom: {
        path: ':roomName',
        parse: {
          roomName: decodeURI,
        },
      },
    },
  },
};


const Stack = createStackNavigator<RootStack>();

export const Navigation = () => {
  const { videoroomState } = useVideoroomState();
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="StartCall"
        screenOptions={{
          headerBackTitle: 'Back',
          headerMode: 'float',
          //@ts-ignore
          isHeaderAbsolutelyPositioned: true,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        {videoroomState === 'InMeeting' ? (
          <>
            <Stack.Screen
              name="VideoCall"
              component={VideoCall}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="StartCall"
              component={StartCall}
              options={{
                headerShown: false,
              }}
            />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
