import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import CircleIcon from "./circle";

export default function Idiomas() {
  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Ionicons
          name="globe-outline"
          size={20}
          color="#6ca1e6"
          style={{ paddingTop: 3 }}
        />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Idiomas
        </ThemedText>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <CircleIcon />

          <View style={{ flexDirection: "column" }}>
            <ThemedText
              style={{ fontSize: 16, fontWeight: "bold", paddingRight: 20 }}
            >
              Inglês - Intermediário
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              Experiência internacional: NÍVEL TÉCNICO.
            </ThemedText>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <CircleIcon />

          <View style={{ flexDirection: "column" }}>
            <ThemedText
              style={{ fontSize: 16, fontWeight: "bold", paddingRight: 20 }}
            >
              Espanhol - Intermediário
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}
