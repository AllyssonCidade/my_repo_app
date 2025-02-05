import React from "react";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";
import CircleIcon from "./circle";
import { Ionicons } from "@expo/vector-icons";

export default function Cursos() {
  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Ionicons
          name="book-outline"
          size={20}
          color="#6ca1e6"
          style={{ paddingTop: 3 }}
        />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Cursos e certificaçãoes
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
              JavaScript Essentials 2 - Cisco Network Academy
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              90 horas - 2024
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
              Cyber security fundamentals - IBM
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              60 horas - 2023
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
              Python para análise de dados - Anhanguera
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              45 horas - 2023
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
              Design Thinking - FIAP
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              40 horas - 2023
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
              React avançado( Next.js ) - Udemy
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              94 horas - 2023
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
              ONE - Formação Front-End (React) - Oracle + Alura
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              560 horas - 2023
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
              Python para machine learning - Didática Tech
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              40 horas - 2022
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
              Design Thinking - FIAP
            </ThemedText>
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "400",
                paddingTop: 0,
              }}
            >
              40 horas - 2023
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}
