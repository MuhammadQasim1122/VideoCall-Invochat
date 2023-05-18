import 'react-native-gesture-handler';
import { BackgroundWrapper } from './components/videocalls/components/BackgroundWrapper';

import React from 'react';
import { StatusBar } from 'react-native';

import { Navigation } from './screens/video_call/Navigation';
import { VideoroomContextProvider } from './components/videocalls/VideoroomContext';
import { NotificationsContextProvider } from './components/videocalls/model/NotficationContext';
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  

  return (
    <BackgroundWrapper>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <SafeAreaProvider>
      {/* <NotificationsContextProvider> */}
      <VideoroomContextProvider>
        
        <Navigation userName={'Qasim'} channel={undefined} channelId={'8fs3puf1y7nnpfhx8bkg9fam6w'} />
      </VideoroomContextProvider>
      {/* </NotificationsContextProvider> */}
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
}
