import { StandardButton } from './../components/buttons/StandardButton';
import React, { useCallback } from 'react';
import { View, StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoroomState } from '../VideoroomContext';

export const StartCall = () => {
    const {
        connectAndJoinRoom,
    } = useVideoroomState();

    const onConnectPress = useCallback(async () => {
        try {
            await connectAndJoinRoom();
        } catch (err) {
            console.warn(err);
        }
    }, [connectAndJoinRoom]);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
            <View style={styles.joinButton}>
                <StandardButton onPress={onConnectPress}>
                    Start The Call
                </StandardButton>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    joinButton: {
        marginTop: 32,
        width: '100%',
    }
});
