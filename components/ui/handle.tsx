import { time } from "@/api/github";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Handle({ style }: { style?: any }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      scale.value = withRepeat(withTiming(24, { duration: 1500 }), -1, true);

      opacity.value = withSequence(
        withRepeat(
          withSequence(withTiming(1), withTiming(0, { duration: 12000 })),
          1,
          false
        )
      );

      return () => {
        scale.value = 1;
        opacity.value = 0;
      };
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: "-40deg" }, { translateX: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={[style]}>
      <Animated.View style={[styles.innerButton, animatedStyle]}>
        <MaterialCommunityIcons
          name="hand-pointing-left"
          size={30}
          color="#6ca1e6"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerButton: {
    position: "relative",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
