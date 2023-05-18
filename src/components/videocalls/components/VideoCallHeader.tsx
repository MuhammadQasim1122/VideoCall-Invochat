// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
// import CompassIcon from "@components/compass_icon";

import { TouchableOpacity } from "react-native-gesture-handler";
// import TouchableWithFeedback from "@app/components/touchable_with_feedback";
import { Image } from "react-native";
// import DmAvatar from "@app/components/channel_icon/dm_avatar";
// import ChannelIcon from "@components/channel_icon";
// import { typography } from "@app/utils/typography";

const VideoCallHeader = (props: any) => {
    const {
        channel,
        onParticpantsPressed,
        handleBackPress,
        membersCount,
        theme,
    } = props;

    const hitSlop = { top: 20, bottom: 20, left: 20, right: 20 };
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.sidebarBg,
            paddingHorizontal: 20,
            paddingVertical: 15,
        },
        titleContainer: {
            alignItems: Platform.select({
                android: "flex-start",
                ios: "center",
            }),
            justifyContent: "flex-start",
            height: "80%",
            paddingHorizontal: 8,
            ...Platform.select({
                ios: {
                    paddingHorizontal: 60,
                    flex: undefined,
                    width: "100%",
                    position: "absolute",
                    left: 16,
                    bottom: 0,
                    zIndex: 1,
                },
            }),
        },
        title: {
            color: 'black'
        },

        leftContainer: {
            justifyContent: "center",
            ...Platform.select({
                ios: {
                    paddingLeft: 16,
                    zIndex: 5,
                    position: "absolute",
                    bottom: 0,
                },
            }),
        },

        rightIcon: {
            marginLeft: 10,
        },
    });

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    {/* <Animated.View style={styles.leftContainer}>
                        <TouchableWithFeedback
                            borderlessRipple={true}
                            onPress={handleBackPress}
                            rippleRadius={20}
                            type={Platform.select({
                                android: "native",
                                default: "opacity",
                            })}
                            testID="call.option.header.back"
                            hitSlop={hitSlop}
                        >
                            <Animated.View style={{}}>
                                <CompassIcon
                                    size={24}
                                    name={
                                        Platform.select({
                                            android: "arrow-left",
                                            ios: "arrow-back-ios",
                                        })!
                                    }
                                    color={theme.sidebarHeaderTextColor1}
                                />
                            </Animated.View>
                        </TouchableWithFeedback>
                    </Animated.View> */}

                    <View
                        style={[
                            styles.titleContainer,
                            { flexDirection: "row", alignItems: "center" },
                        ]}
                    >
                        {/* {channel?.name && (
                            <View style={{ marginRight: 5 }}>
                                <ChannelIcon
                                    membersCount={membersCount}
                                    name={channel?.name}
                                    shared={channel?.shared}
                                    size={32}
                                    type={channel?.type}
                                />
                            </View>
                        )} */}
                        <Animated.Text numberOfLines={1} style={[styles.title]}>
                        {channel?.displayName}
                        </Animated.Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onParticpantsPressed}>
                    <Image
                        source={require("@assets/images/participants.png")}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: theme.sidebarHeaderTextColor1,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default VideoCallHeader;
