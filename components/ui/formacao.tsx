import React from "react";
import { View } from "react-native";
import CircleIcon from "./circle";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

export default function Formacao() {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Ionicons
          name="book"
          size={20}
          color="#6ca1e6"
          style={{ paddingTop: 3 }}
        />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Formação
        </ThemedText>
      </View>

      {/* BLOCO DO NOME DA INSTITUIÇÃO, PERIODO E DESCRIÇÃO */}
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
            Anhanguera - Análise e Desenvolvimento de Sistemas
          </ThemedText>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            2023 - 2025
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
