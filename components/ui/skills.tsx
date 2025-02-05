import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { ThemedText } from "../ThemedText";
import * as Progress from "react-native-progress";

import { Image, useColorScheme, View } from "react-native";

export default function Skills() {
  const colorScheme = useColorScheme();
  const [expandedTools, setExpandedTools] = useState(false);
  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {colorScheme === "dark" ? (
          <Image
            source={require("@/assets/images/ferramenta-white.png")}
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <Image
            source={require("@/assets/images/ferramenta-black.png")}
            style={{ width: 20, height: 20 }}
          />
        )}
        <ThemedText style={{ fontSize: 20 }}>Ferramentas</ThemedText>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <View style={{ flexDirection: "column" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            React Native
          </ThemedText>
          <Progress.Bar progress={0.75} width={300} />
        </View>

        <View style={{ flexDirection: "column" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            Javascript
          </ThemedText>
          <Progress.Bar progress={0.8} width={300} />
        </View>

        <View style={{ flexDirection: "column" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            Python
          </ThemedText>
          <Progress.Bar progress={0.5} width={300} />
        </View>

        <View style={{ flexDirection: "column" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            React
          </ThemedText>
          <Progress.Bar progress={0.8} width={300} />
        </View>

        <View style={{ flexDirection: "column" }}>
          <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
            Next
          </ThemedText>
          <Progress.Bar progress={0.6} width={300} />
        </View>
        {!expandedTools ? (
          <Button
            title="Ver mais"
            color="transparent"
            onPress={() => setExpandedTools(!expandedTools)}
          />
        ) : null}
        {expandedTools && (
          <View style={{ flexDirection: "column", gap: 5 }}>
            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Node
              </ThemedText>
              <Progress.Bar progress={0.67} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Tailwind
              </ThemedText>
              <Progress.Bar progress={0.9} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                CSS
              </ThemedText>
              <Progress.Bar progress={0.95} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Figma
              </ThemedText>
              <Progress.Bar progress={0.78} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Git
              </ThemedText>
              <Progress.Bar progress={0.68} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Firebase
              </ThemedText>
              <Progress.Bar progress={0.72} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                GraphQL
              </ThemedText>
              <Progress.Bar progress={0.45} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Docker
              </ThemedText>
              <Progress.Bar progress={0.4} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                SQL
              </ThemedText>
              <Progress.Bar progress={0.7} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Nest
              </ThemedText>
              <Progress.Bar progress={0.65} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Express
              </ThemedText>
              <Progress.Bar progress={0.6} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Sequelize
              </ThemedText>
              <Progress.Bar progress={0.6} width={300} />
            </View>

            <View style={{ flexDirection: "column" }}>
              <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                Styled Components
              </ThemedText>
              <Progress.Bar progress={0.7} width={300} />
            </View>
            <Button
              title="Ver menos"
              color="transparent"
              onPress={() => setExpandedTools(!expandedTools)}
            />
          </View>
        )}
      </View>
    </View>
  );
}
