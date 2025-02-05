import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { View, useColorScheme } from "react-native";

import { ImageBackground } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HeaderCard from "@/components/ui/headerCard";
import Formacao from "@/components/ui/formacao";
import Experiencias from "@/components/ui/experiencias";
import Skills from "@/components/ui/skills";
import Cursos from "@/components/ui/cursos";
import Idiomas from "@/components/ui/idiomas";

export default function Curriculo() {
  const colorScheme = useColorScheme();

  return (
    <ImageBackground
      source={require("@/assets/images/f.jpg")}
      resizeMode="cover"
      imageStyle={{ opacity: colorScheme === "dark" ? 0.3 : 0.5 }}
      style={{
        flex: 1,
        paddingTop: 30,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ScrollView>
        <HeaderCard />

        <View
          style={{
            flexDirection: "column",
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            paddingBottom: 40,
            margin: 10,
            gap: 30,
            paddingRight: 20,
          }}
        >
          <ThemedText
            style={{
              fontSize: 24,
              paddingLeft: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Curriciulo
          </ThemedText>
          <Formacao />
          <Experiencias />
          <Skills />
          <Cursos />
          <Idiomas />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
