import { ThemedText } from "@/components/ThemedText";
import type { ReactNode } from "react";
import { ScrollView, View, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";

const SUMMARY = [
  "Desenvolvedor Mobile com experiência em React Native, Kotlin e Java. Hoje atuo construindo apps e integrações para terminais de pagamento.",
  "Experiência em integrações de SDKs externas (POS Android), criação de plugins nativos e comunicação com APIs REST/GraphQL.",
  "Histórico de freelas para e-commerce entregando otimizações de UX e personalizações de plataformas low-code.",
];

const EXPERIENCE = [
  {
    company: "BSK Pay",
    role: "Desenvolvedor Mobile",
    period: "2023 — atual",
    bullets: [
      "Plugin Flutter nativo para integração de pagamentos em POS Android.",
      "Onboarding bancário completo em React Native com autenticação via API.",
      "Feature de licenciamento para empréstimos (React + Node.js).",
    ],
  },
  {
    company: "CEPEDI",
    role: "Desenvolvedor Mobile Residente",
    period: "2021 — 2023",
    bullets: [
      "Aplicativos internos para diagnóstico de terminais e testes automatizados.",
      "Métricas de consumo de bateria e simulação de vendas sem intervenção manual.",
      "Otimização de módulos críticos (leitura de cartão, coleta térmica).",
      "Participação no projeto Posto Certo, com MVP em React Native e feed em tempo real via Firebase.",
    ],
  },
  {
    company: "Freelancer",
    role: "Desenvolvedor Web",
    period: "2019 — 2021",
    bullets: [
      "Melhorias visuais e funcionais para e-commerces usando JavaScript, jQuery e CSS.",
      "Ajustes estratégicos de layout impactando diretamente a conversão.",
      "Customizações em plataformas low-code conforme demandas de cada cliente.",
    ],
  },
];

const EDUCATION = [{
  id: "1",
  title: "Análise e Desenvolvimento de Sistemas",
  institution: "Anhanguera",
}, {
  id: "2",
  title: "MBA em Gestão de TI (ênfase em Gestão)",
  institution: "Unijorge",
}];

const COURSES = [
  "Mobile Developer · DIO",
  "React Avançado (Next.js) · Udemy",
  "JavaScript Essentials 2 · Cisco",
  "CCNAv7 · Cisco",
  "Design Thinking · FIAP",
  "ONE - Formação Front-End (React) · Oracle + Alura",
];

const SKILL_GROUPS = [
  {
    title: "Front-end",
    items: "React.js, Next.js, Expo, HTML, CSS, JavaScript, Figma",
  },
  {
    title: "Back-end",
    items: "Node.js, Express, Strapi, Firebase, Python",
  },
  {
    title: "Mobile",
    items: "React Native, Expo, Kotlin, Java, Firebase",
  },
  {
    title: "Banco de Dados",
    items: "Firestore, Firebase, MySQL, Sequelize",
  },
  {
    title: "Processos",
    items: "Git, GitHub, Jira, Scrum, Airtable",
  },
  {
    title: "Plataformas",
    items: "WordPress, Nuvemshop",
  },
];

const LANGUAGES = ["Inglês — leitura técnica e conversação básica"];

export default function Curriculo() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.background }}
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 100 + insets.bottom },
        ]}
      >
          <View
            style={[
              styles.headerCard,
              {
                borderColor: palette.text + "20",
                backgroundColor:
                  colorScheme === "dark"
                    ? "rgba(21,23,24,0.9)"
                    : "rgba(255,255,255,0.96)",
              },
            ]}
          >
            <ThemedText style={styles.name}>
              Allysson Cidade Costa de Carvalho
            </ThemedText>
            <ThemedText style={styles.caption}>
              Catu de Abrantes (Abrantes) · BA
            </ThemedText>
            <ThemedText style={styles.caption}>
              Cel/WhatsApp: (71) 99724-8724 · allyssoncidade@gmail.com
            </ThemedText>
          </View>

          <Section title="Resumo profissional">
            <View
              style={[
                styles.card,
                { borderColor: palette.text + "15", backgroundColor: "transparent" },
              ]}
            >
              {SUMMARY.map((point) => (
                <View key={point} style={styles.summaryRow}>
                  <View
                    style={[
                      styles.summaryDot,
                      { backgroundColor: palette.tint },
                    ]}
                  />
                  <ThemedText style={styles.summaryText}>{point}</ThemedText>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Experiência profissional">
            <View style={{ gap: 16 }}>
              {EXPERIENCE.map((item) => (
                <View
                  key={item.company}
                  style={[
                    styles.card,
                    { borderColor: palette.text + "15" },
                  ]}
                >
                  <ThemedText style={styles.cardTitle}>
                    {item.role} · {item.company}
                  </ThemedText>
                  <ThemedText style={styles.cardSubtitle}>
                    {item.period}
                  </ThemedText>
                  <View style={{ gap: 6 }}>
                    {item.bullets.map((bullet) => (
                      <View key={bullet} style={styles.bulletRow}>
                        <ThemedText style={styles.bulletText}>
                          • {bullet}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Formação">
            <View style={{ gap: 10 }}>
              {EDUCATION.map((edu) => (
                <ThemedView key={edu.id}>
                <ThemedText  style={styles.bulletText}>
                  • {edu.title} ·
                </ThemedText>
                <ThemedText style={styles.bulletText}>
                  {edu.institution}
                </ThemedText>
                </ThemedView>
                
              ))}
            </View>
          </Section>

          <Section title="Cursos e certificações">
            <View style={{ gap: 10 }}>
              {COURSES.map((course) => (
                <ThemedText key={course} style={styles.bulletText}>
                  • {course}
                </ThemedText>
              ))}
            </View>
          </Section>

          <Section title="Competências técnicas">
            <View style={{ gap: 12 }}>
              {SKILL_GROUPS.map((group) => (
                <View key={group.title}>
                  <ThemedText style={styles.skillTitle}>{group.title}</ThemedText>
                  <ThemedText style={styles.bulletText}>
                    {group.items}
                  </ThemedText>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Idiomas">
            {LANGUAGES.map((language) => (
              <ThemedText key={language} style={styles.bulletText}>
                • {language}
              </ThemedText>
            ))}
          </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    gap: 24,
    paddingBottom: 40,
  },
  headerCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  caption: {
    fontSize: 14,
    opacity: 0.8,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginTop: 6,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 13,
    opacity: 0.75,
  },
  bulletRow: {
    paddingLeft: 4,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
  },
  skillTitle: {
    fontWeight: "700",
    fontSize: 14,
  },
});
