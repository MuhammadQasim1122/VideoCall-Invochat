import { BrandColors, TextColors } from '../../shared/colors';
import { Typo } from '../Typo';
import React, { ReactNode } from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useDebounce } from '../../shared/debouncer';

const CardButtonStyles = StyleSheet.create({
  wrapper: {
    height: 179,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 358,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.darkBlue100,
  },
  animatedView: {
    height: 179,
    borderRadius: 16,
  },
});

type CardButtonProps = {
  iconName: string;
  onPress: () => void;
  children: ReactNode;
};

export const CardButton = ({
  iconName,
  onPress,
  children,
}: CardButtonProps) => {
  const progress = useSharedValue(0);
  const debouncedOnPress = useDebounce(onPress);

  const backgroundColorStyle = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [BrandColors.seaBlue40, BrandColors.seaBlue60]
      ),
    }),
    [progress]
  );

  return (
    <View style={CardButtonStyles.wrapper}>
      <Pressable
        onPressIn={() => {
          progress.value = withTiming(1);
        }}
        onPressOut={() => (progress.value = 0)}
        onPress={debouncedOnPress}
      >
        <Animated.View
          style={[CardButtonStyles.animatedView, backgroundColorStyle]}
        >
          <View style={CardButtonStyles.content}>
          {/* <Image
                                                source={require("../../assets/images/"+ iconName+'.png')}
                                                style={{tintColor:TextColors.darkText,height:32, width:32}}
                                            /> */}
            
            <Typo variant="h4">{children}</Typo>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};
