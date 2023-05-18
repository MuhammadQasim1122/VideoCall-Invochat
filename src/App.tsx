import 'react-native-gesture-handler';
import { BackgroundWrapper } from './components/videocalls/components/BackgroundWrapper';

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Navigation } from './screens/video_call/Navigation';
import { VideoroomContextProvider } from './VideoroomContext';

export default function App() {
  

  return (
    <BackgroundWrapper>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <VideoroomContextProvider>
        <Navigation userName={'Qasim'} channel={undefined} channelId={''} />
      </VideoroomContextProvider>
    </BackgroundWrapper>
  );
}
