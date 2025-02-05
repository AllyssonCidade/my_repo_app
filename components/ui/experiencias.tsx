import React from "react";
import CircleIcon from "./circle";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { View } from "react-native";

export default function Experiencias() {
  return (
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Ionicons
          name="star"
          size={20}
          color="#6ca1e6"
          style={{ paddingTop: 3 }}
        />
        <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
          Experiências
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
            Desenvolvedor web - Freelancer
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "400",
              paddingTop: 0,
            }}
          >
            junho de 2023 até o momento
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "thin",
              paddingTop: 14,
            }}
          >
            Criação de websites responsivos seguindo os melhores padrões de SEO.
            Correção de bugs e erros, buscando melhor performance, aparência e
            funcionalidade em sites. Utilização de ferramentas como Nuvemshop e
            WordPress para criação de sites. Desenvolvimento de componentes e
            scripts personalizados. Utilização de linguagens de programação como
            JavaScript e PHP.
          </ThemedText>
        </View>
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
            Residência em desenvolvimento Mobile - CEPEDI
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "400",
              paddingTop: 0,
            }}
          >
            junho de 2024 até o momento
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "thin",
              paddingTop: 14,
            }}
          >
            Criando aplicativos e softwares buscando solucionar problemas e
            dificuldades governamentais e de empresas privadas. Realizando
            pesquisas e estudos baseados em artigos e dados colhidos dentro das
            empresas para auxiliar na produção de soluções e estudos futuros
          </ThemedText>
        </View>
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
            Cabo - Marinha do Brasil
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "400",
              paddingTop: 0,
            }}
          >
            janeiro de 2013 até janeiro de 2022
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 16,
              fontWeight: "thin",
              paddingTop: 14,
            }}
          >
            Supervisão e controle de serviços e pessoal. Atendimento ao público.
            Controle e arquivamento de documentos náuticos.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
