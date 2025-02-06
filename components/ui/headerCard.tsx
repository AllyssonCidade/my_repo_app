import React, { useState } from "react";
import {
  Image,
  Linking,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "../ThemedText";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import BlinkingButton from "./blinkingButton";
import Handle from "./handle";
import { Colors } from "@/constants/Colors";

export default function HeaderCard() {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = () => {
    const url =
      "https://docs.google.com/document/d/1nNf4ffBw39NJGoYGS7QcVrYKA-i2A9mm6ot22Gjb4iI/export?format=pdf";
    Linking.openURL(url);
  };
  const color = Colors[useColorScheme() ?? "light"].text;
  return (
    <View
      style={{
        flexDirection: "column",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View>
          <Image
            style={{ width: 90, height: 90, borderRadius: 90 }}
            source={require("@/assets/images/bg.png")}
          />
        </View>
        <View style={{ flexDirection: "column", gap: 4 }}>
          <ThemedText
            style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}
          >
            Allysson Cidade
          </ThemedText>
          <View>
            <ThemedText>Mobile Developer</ThemedText>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <EvilIcons
            onPress={() =>
              Linking.openURL("https://github.com/AllyssonCidade/")
            }
            name={"sc-github"}
            size={40}
          />
          <EvilIcons
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/allysson-cidade/")
            }
            name={"sc-linkedin"}
            size={40}
          />
        </View>
        <BlinkingButton
          iconName="download"
          onPress={handleDownload}
          children={"Baixar Currículo"}
        />
        <Handle
          style={{
            position: "relative",
            right: 50,
            top: -20,
          }}
        />
      </View>

      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <EvilIcons
          style={{
            alignSelf: "center",
            marginBottom: expanded ? -15 : -25,
            borderBottomRightRadius: 20,
            borderColor: "transparent",
            borderRadius: 50,
            paddingHorizontal: 4,
          }}
          color={Colors[useColorScheme() ?? "light"].text}
          name={expanded ? "chevron-up" : "chevron-down"}
          size={40}
        />
      </TouchableOpacity>

      {expanded && (
        <View
          style={{
            marginTop: 10,
            borderTopColor: color,
            borderTopWidth: 1,
            flexDirection: "column",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 20,
            }}
          >
            <EvilIcons
              name="envelope"
              size={30}
              color="#6ca1e6"
              style={{
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 2,
                borderRadius: 5,
                paddingBottom: 6,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <ThemedText>Email</ThemedText>
              <ThemedText>allyssoncidade@gmail.com</ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 20,
            }}
          >
            <Ionicons
              name="logo-whatsapp"
              size={25}
              color="#6ca1e6"
              style={{
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 2,
                borderRadius: 5,
                paddingHorizontal: 2,
                paddingBottom: 4,
                paddingTop: 4,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <ThemedText>Telefone</ThemedText>
              <ThemedText>(71) 99724-8724</ThemedText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 20,
            }}
          >
            <EvilIcons
              name="calendar"
              size={30}
              color="#6ca1e6"
              style={{
                borderWidth: 1,
                borderColor: "transparent",
                elevation: 2,
                borderRadius: 5,
                paddingBottom: 6,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <ThemedText>Nascimento</ThemedText>
              <ThemedText>06 de Abril de 1994</ThemedText>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
