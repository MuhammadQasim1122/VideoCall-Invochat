// // import TouchableWithFeedback from "@app/components/touchable_with_feedback";
// import React from "react";
// import { CallOptionsHeader } from "../../components/videocalls/components/CallOptionsHeader";
// import { ParticipantsStatusTile } from "../../components/videocalls/components/ParticipantsStatusTile";
// // import useAndroidHardwareBackHandler from "@app/hooks/android_back_handler";
// import { useCallback } from "react";
// import { StyleSheet, View, Platform, Image } from "react-native";
// import { FlatList } from "react-native-gesture-handler";

// // import { popTopScreen } from "../navigation";
  



// export const CallOptions = ({ route }: { route: any }) => {
//     const participants = route.params.participants;
// const componentId = route.params.componentId;

//     const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};

//     // const handleBack = useCallback(async () => {
//     //     popTopScreen(componentId);
//     //   }, [ componentId]);
//     //   useAndroidHardwareBackHandler(componentId, handleBack);
 
//  return( <View style={styles.container}>
                    
//                     <CallOptionsHeader  title={`Particpants(${participants.length})` }
//                      trailingComponent={ 
//                     //  <TouchableWithFeedback 
//                     //         borderlessRipple={true}
//                     //         onPress={() => {}}
//                     //         rippleRadius={20}
//                     //         type={Platform.select({
//                     //             android: "native",
//                     //             default: "opacity",
//                     //         })}
//                     //         testID="call.option.header.trailing"
//                     //         hitSlop={hitSlop}
//                     //  >
//                     // <Image source={require('@assets/images/person_add.png')} 
//                     //  resizeMode='contain'
//                     // style={{width: 24, height: 24, }}/> 
//                     //  </TouchableWithFeedback> } />
//                     <FlatList data={participants} 
//                     keyExtractor={(item) => item.id}
//                     renderItem={({item}) => <ParticipantsStatusTile participant={item}/>}} />

//              </View>);
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
// });