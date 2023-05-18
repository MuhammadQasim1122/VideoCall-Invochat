export type PreviewTitle = 'New meeting' | 'Join meeting';
// import { AvailableScreens } from '@typings/screens/navigation';
export type RootStack = {
  JoinRoom: { id: any};
  Preview: { title: PreviewTitle };
  Room: { id: any};
  CallOptions: {participants: []};
};
