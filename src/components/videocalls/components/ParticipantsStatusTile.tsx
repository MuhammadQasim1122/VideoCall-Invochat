import { StyleSheet, View } from "react-native";
import type { Participant } from "./NotFocusedParticipants";
import { Typo } from "./Typo";

import { Image } from "react-native";
import { getShortUsername } from "../shared/utils";
import React from "react";

export const ParticipantsStatusTile = ({ participant }: Participant) => {
    const { metadata, tracks, type } = participant;
    const audioTrack = tracks.find((t) => t.type === "Audio");

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.shortUsername}>
                    <Typo variant="label" color={"black"}>
                        {getShortUsername(metadata.displayName)}
                    </Typo>
                </View>
                <Typo variant="h5" style={styles.displayName} color={"black"}>
                    {metadata.displayName}{" "}
                </Typo>
            </View>

            <View style={styles.micContainer}>
                <Image
                    source={
                        audioTrack?.metadata.active
                            ? require("../../../../assets/images/micOpen.png")
                            : require("../../../../assets/images/micClose.png")
                    }
                    style={
                        audioTrack?.metadata.active
                            ? styles.activeMic
                            : styles.inActiveMic
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomColor: "#CAC4D0",
        borderBottomWidth: 0.5,
        marginHorizontal: 20,
    },
    noCameraContent: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#CAC4D0",
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    shortUsername: {
        height: 30,
        width: 30,
        borderRadius: 5,
        borderWidth: 0.6,
        borderColor: "#CAC4D0",
        justifyContent: "center",
        alignItems: "center",
    },

    displayName: {
        fontSize: 14,
        fontWeight: "600",
        paddingHorizontal: 10,
    },
    micContainer: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 0.6,
        borderColor: "#CAC4D0",
        justifyContent: "center",
        alignItems: "center",
    },
    activeMic: {
        tintColor: "green",
        height: 20,
        width: 20,
    },
    inActiveMic: {
        tintColor: "red",
        height: 20,
        width: 20,
    },
});
