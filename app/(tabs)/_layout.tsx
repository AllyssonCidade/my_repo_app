import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { EvilIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const palette = Colors[colorScheme ?? "light"];
  const safeBottom = Math.max(insets.bottom, 6);
  const floatBottom =
    Platform.OS === "android" ? safeBottom + 10 : safeBottom + 4;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarHideOnKeyboard: true,
        tabBarIconStyle: { marginTop: -2 },
        tabBarStyle: {
          position: "absolute",
          left: 16,
          right: 16,
          bottom: floatBottom,
          borderRadius: 28,
          backgroundColor: palette.surface ?? palette.background,
          borderWidth: colorScheme === "dark" ? 1 : 0,
          borderColor:
            colorScheme === "dark" ? palette.text + "20" : "transparent",
          paddingBottom: 10,
          paddingTop: 8,
          height: 64,
          shadowColor: colorScheme === "dark" ? "#000" : "#FF8C00",
          shadowOpacity: colorScheme === "dark" ? 0.25 : 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 6,
        },
        tabBarItemStyle: { paddingVertical: 0 },
        tabBarLabelStyle: { paddingBottom: 4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="curriculo"
        options={{
          title: "Curriculo",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="external-link" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="repos"
        options={{
          title: "Projetos",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="archive" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
