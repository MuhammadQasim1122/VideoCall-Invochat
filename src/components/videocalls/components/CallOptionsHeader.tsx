// // import CompassIcon from '@app/components/compass_icon';
// // import TouchableWithFeedback from '@app/components/touchable_with_feedback';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, Text, Platform, StyleSheet } from 'react-native';
// import Animated from 'react-native-reanimated';

// interface CallOptionsHeaderProps {
//   title: string;
//   trailingComponent: React.ReactNode;
// }

// export const CallOptionsHeader = ({ title, trailingComponent }: CallOptionsHeaderProps) => {
//     const navigation = useNavigation();
//     const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};
    
// return (
//     <View style = {styles.container}>
//      <View style= {{flexDirection: 'row'}}>
//          <TouchableWithFeedback
//                         borderlessRipple={true}
//                         onPress={
//                             Platform.select({
//                                 android: () => navigation.goBack(),
//                                 default: () => navigation.goBack(),
//                             })!
//                         }
//                         rippleRadius={20}
//                         type={Platform.select({
//                             android: "native",
//                             default: "opacity",
//                         })}
//                         testID="call.option.header.back"
//                         hitSlop={hitSlop}
//                     >
//                         <Animated.View style={{}}>
//                             <CompassIcon
//                                 size={24}
//                                 name={
//                                     Platform.select({
//                                         android: "arrow-left",
//                                         ios: "arrow-back-ios",
//                                     })!
//                                 }
//                                 color={'black'}
//                             />
//                         </Animated.View>
//                     </TouchableWithFeedback>
//                     <Text style= {styles.title}>{title}</Text>

//      </View>
//       {trailingComponent}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems:'center',
//         justifyContent: 'space-between',
//         backgroundColor: '#F6F6F6',
//         paddingHorizontal: 20,
//         paddingVertical: 20,
//     },
    
//     title:{
//         fontSize: 18,
//         fontWeight: '600',
//         color: 'black',
//         paddingLeft: 20,
//     }
// });
