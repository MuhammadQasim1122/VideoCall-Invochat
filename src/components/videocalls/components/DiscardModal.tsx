import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { useVideoroomState } from '../VideoroomContext';

import { Modal } from './Modal';
import { StandardButton } from './buttons/StandardButton';

type GoBackAction = Readonly<{
  type: string;
  payload?: object | undefined;
  source?: string | undefined;
  target?: string | undefined;
}>;
type DiscardModalProps = {
  headline: string;
  body: string;
  buttonText: string;
  handleBeforeRemoveEvent: (
    e: GoBackAction,
    setIsModalVisible: (isVisible: boolean) => void
  ) => void;
  onDiscard?: () => void;
};

export const DiscardModal = ({
  headline,
  body,
  buttonText,
  handleBeforeRemoveEvent,
  onDiscard = () => {},
}: DiscardModalProps) => {
  const navigation = useNavigation();
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();
  const modalAction = useRef<GoBackAction>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const _handleBeforeRemoveEvent = (e:any) => {
        handleBeforeRemoveEvent(e, setIsModalVisible);
        modalAction.current = e.data.action;
      };

      navigation.addListener('beforeRemove', _handleBeforeRemoveEvent);

      return () =>
        navigation.removeListener('beforeRemove', _handleBeforeRemoveEvent);
    }, [navigation, roomName, username])
  );

  return (
    <Modal
      headline={headline}
      body={body}
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
    >
      <StandardButton
        type="danger"
        onPress={() => {
          setIsModalVisible(false);
          setRoomName('');
          setUsername('');
          navigation.dispatch(modalAction.current!);
          onDiscard();
        }}
      >
        {buttonText}
      </StandardButton>
    </Modal>
  );
};