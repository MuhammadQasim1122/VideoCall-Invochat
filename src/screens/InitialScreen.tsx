import { BackgroundAnimation } from '../components/BackgroundAnimation';
import { Typo } from '../components/Typo';

import React from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const InitialScreen = ({ navigation }) => {
  return (
    <BackgroundAnimation>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/Logo.png')}
            />
            <View style={styles.subtitle}>
              <Typo variant="h5">Videoconferencing for everyone</Typo>
            </View>
          </View>

          <View style={styles.createButton}>
          <Pressable
            onPress={() => {
              navigation.push('CreateRoom');
            }}>
            <Text style={{color:'black'}}>{'Create new meeting'}</Text>
          </Pressable>
          </View>

          <View style={styles.joinButton}>
          <Pressable
            onPress={() => {
              navigation.push('JoinRoom');
            }}>
            <Text style={{color:'black'}}>{'Join The Room'}</Text>
          </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </BackgroundAnimation>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
  createButton: {
    marginTop: 64,
  },
  joinButton: {
    marginTop: 16,
  },
  logo: {
    width: 223,
    height: 49,
    resizeMode: 'contain',
  },
});
