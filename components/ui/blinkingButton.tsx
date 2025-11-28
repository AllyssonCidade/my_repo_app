import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

const BlinkingButton = ({
  children,
  onPress,
  iconName,
}: {
  children: string;
  onPress: () => void;
  iconName?: any;
}) => {
  const opacity = useSharedValue(1);
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.2, { duration: 2000 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Animated.View style={[styles.innerButton, animatedStyle]}>
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name={iconName}
          size={20}
          color={palette.text}
        />
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 10, borderRadius: 10, backgroundColor: "transparent" },
  innerButton: { padding: 10, flexDirection: "row", alignItems: "center" },
  text: { color: "#fff", fontSize: 16, textAlign: "center" },
});

export default BlinkingButton;
