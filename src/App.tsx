import React from 'react';


import { Navigation } from './Navigation';
import { VideoroomContextProvider } from './VideoroomContext';

export default function App() {
  return (
      <VideoroomContextProvider>
        <Navigation />
      </VideoroomContextProvider>
  );
}
