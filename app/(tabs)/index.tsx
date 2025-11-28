import {
  ScrollView,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
  Alert,
  Image,
  useColorScheme,
  Animated,
} from "react-native";
import type { ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { getUserData } from "@/api/github";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type ComponentProps,
} from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { ThemedText } from "@/components/ThemedText";

export interface UserTypes {
  name: string;
  url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

type MaterialIconName = ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

type FeatherIconName = ComponentProps<typeof Feather>["name"];

type TimelineItem = {
  id: string;
  title: string;
  period: string;
  description: string;
  icon: MaterialIconName;
  accent: string;
};

type ContactAction = {
  id: string;
  label: string;
  helper: string;
  action: "email" | "whatsapp" | "copy" | "calendar" | "link";
  value: string;
  icon: FeatherIconName;
};

type SocialAction = {
  id: string;
  label: string;
  icon: FeatherIconName;
  url: string;
};

const CAREER_TIMELINE: TimelineItem[] = [
  {
    id: "journey-bsk",
    title: "Desenvolvedor Mobile · BSK Pay",
    period: "2025 — atual",
    description:
      "Plugins nativos para POS Android, onboarding bancário em React Native e licenciamento em React + Node.",
    icon: "credit-card-sync-outline",
    accent: "#FF8C00",
  },
  {
    id: "journey-cepedi",
    title: "Mobile Residente · CEPEDI",
    period: "2024 — 2025",
    description:
      "Ferramentas de diagnóstico, testes automatizados e MVP do Posto Certo com feed em tempo real.",
    icon: "cellphone-wireless",
    accent: "#FF5F00",
  },
  {
    id: "journey-freela",
    title: "Desenvolvedor Web · Freelancer",
    period: "2023 — 2024",
    description:
      "Customizações para e-commerces, otimizações de UX e integrações sob demanda em plataformas low-code.",
    icon: "briefcase-outline",
    accent: "#FFC857",
  },
];

const CONTACT_ACTIONS: ContactAction[] = [
  {
    id: "email",
    label: "Enviar e-mail",
    helper: "allyssoncidade@gmail.com",
    action: "email",
    value: "allyssoncidade@gmail.com",
    icon: "mail",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    helper: "(71) 99724-8724",
    action: "whatsapp",
    value: "5571997248724",
    icon: "message-circle",
  },
  {
    id: "copy-email",
    label: "Copiar contato",
    helper: "E-mail na área de transferência",
    action: "copy",
    value: "allyssoncidade@gmail.com",
    icon: "copy",
  },
  {
    id: "cv",
    label: "Baixar currículo",
    helper: "PDF atualizado",
    action: "link",
    value:
      "https://docs.google.com/document/d/1nNf4ffBw39NJGoYGS7QcVrYKA-i2A9mm6ot22Gjb4iI/export?format=pdf",
    icon: "download",
  },
];

const SOCIAL_LINKS: SocialAction[] = [
  {
    id: "github",
    label: "GitHub",
    icon: "github",
    url: "https://github.com/AllyssonCidade",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/allysson-cidade/",
  },
  {
    id: "portfolio",
    label: "Portfólio React",
    icon: "external-link",
    url: "https://github.com/AllyssonCidade?tab=repositories",
  },
];

const SUMMARY_POINTS = [
  "Desenvolvedor Mobile com experiência em React Native, Kotlin e Java, hoje focado em terminais de pagamento.",
  "Integrações de SDKs externas (POS), plugins nativos e APIs REST/GraphQL para produtos bancários.",
  "Histórico em e-commerce entregando otimizações de UX e customizações sob demanda.",
];

const QUICK_TAGS = [
  "React Native",
  "Kotlin",
  "React.js",
  "POS Android",
  "Javascript",
  "SDK Integration",
  "Java (Android)",
  "Next.js",
  "Node.js",
  "Nest.js",
  "Express",
  "Strapi",
  "MySQL",
  "Git",
  "GitHub",
  "GraphQL",
  "Firebase",
];

const FORMATION_ITEMS = [
  {
    title: "Análise e Desenvolvimento de Sistemas",
    place: "Anhanguera",
  },
  {
    title: "MBA em Gestão de TI (cursando)",
    place: "Unijorge",
  },
];

const COURSE_ITEMS = [
  "Mobile Developer · DIO",
  "React Avançado (Next.js) · Udemy",
  "JavaScript Essentials 2 · Cisco",
  "CCNAv7 · Cisco",
  "Design Thinking · FIAP",
  "ONE Front-End · Oracle + Alura",
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [user, setUser] = useState<UserTypes | null>(null);
  const palette = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const resumeAction = CONTACT_ACTIONS.find((action) => action.id === "cv");
  const heroAnimation = useRef(new Animated.Value(0.92)).current;
  const experienceAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
      const userData = await getUserData();
      setUser(userData);
      } catch (error) {
        console.warn("Falha ao buscar usuário do GitHub", error);
        Alert.alert(
          "Sem conexão com o GitHub",
          "Mostrando dados locais enquanto a API não responde."
        );
        setUser({
          name: "Allysson Cidade",
          url: "https://github.com/AllyssonCidade",
          bio: "Desenvolvedor Mobile com foco em terminais de pagamento, React Native e integrações POS.",
          public_repos: 62,
          followers: 16,
          following: 18,
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(heroAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6,
      }),
      Animated.timing(experienceAnimation, {
        toValue: 1,
        duration: 600,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [experienceAnimation, heroAnimation]);

  const Section = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: ReactNode;
  }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionAccent} />
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
          {subtitle ? (
            <ThemedText style={styles.sectionSubtitle}>{subtitle}</ThemedText>
          ) : null}
        </View>
      </View>
      {children}
    </View>
  );

  const timelineData = useMemo(() => CAREER_TIMELINE, []);

  const handleSharePortfolio = async () => {
    try {
      await Haptics.selectionAsync();
      await Share.share({
        message: `Confira meu portfólio mobile e os últimos projetos no GitHub: ${
          user?.url ?? "https://github.com/AllyssonCidade"
        }`,
      });
    } catch {
      Alert.alert(
        "Ops!",
        "Não foi possível abrir o compartilhamento agora. Tente novamente."
      );
    }
  };

  const handleContactAction = async (action: ContactAction) => {
    try {
      await Haptics.selectionAsync();
      switch (action.action) {
        case "email":
          await Linking.openURL(
            `mailto:${action.value}?subject=${encodeURIComponent(
              "Vamos conversar"
            )}&body=${encodeURIComponent("Oi Allysson! Vamos trocar uma ideia?")}`
          );
          break;
        case "whatsapp":
          await Linking.openURL(
            `https://wa.me/${action.value}?text=${encodeURIComponent(
              "Oi Allysson! Quero saber mais sobre o seu trabalho."
            )}`
          );
          break;
        case "copy":
          await Clipboard.setStringAsync(action.value);
          Alert.alert("Copiado", "E-mail adicionado à área de transferência.");
          break;
        case "calendar":
        case "link":
          await Linking.openURL(action.value);
          break;
        default:
          break;
      }
    } catch {
      Alert.alert("Não foi possível abrir o link agora.");
    }
  };

  const handleSocialPress = async (url: string) => {
    try {
      await Haptics.selectionAsync();
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Link indisponível no momento.");
      }
    } catch {
      Alert.alert("Não foi possível abrir o link agora.");
    }
  };

  const gradientColors: [ColorValue, ColorValue] =
    colorScheme === "dark"
      ? [palette.tintAlt, "#140B03"]
      : ["#FF8C00", "#FF5C00"];
  const experienceTranslate = experienceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

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
        <Animated.View style={{ transform: [{ scale: heroAnimation }] }}>
          <LinearGradient
            colors={gradientColors}
            style={[
              styles.heroGradient,
              {
                borderColor:
                  colorScheme === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(255,140,0,0.35)",
              },
            ]}
          >
            <View style={styles.heroTopRow}>
              <Image
            source={{ uri: "https://github.com/AllyssonCidade.png" }}
                style={styles.heroAvatar}
                resizeMode="cover"
              />
              <View style={styles.heroTitleGroup}>
                <ThemedText style={styles.heroName}>{user?.name}</ThemedText>
                <ThemedText style={styles.heroRole}>
                  Desenvolvedor Mobile · Terminais de pagamento
            </ThemedText>
                <ThemedText style={styles.heroEmail}>
              allyssoncidade@gmail.com
            </ThemedText>
          </View>
        </View>
            <ThemedText style={styles.heroIntro}>
              Construo experiências mobile end-to-end e POS Android em React Native, Kotlin e
              Node, conectando APIs, produtos digitais e jornadas omnichannel.
            </ThemedText>
            <View style={styles.heroChips}>
              {QUICK_TAGS.slice(0, 3).map((tag) => (
                <View key={tag} style={styles.heroChip}>
                  <ThemedText style={styles.heroChipText}>{tag}</ThemedText>
                </View>
              ))}
          </View>
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.heroButtonPrimary}
                onPress={() => router.push("/(tabs)/repos")}
              >
                <Feather name="code" size={16} color="#1b1b1b" />
                <ThemedText style={styles.heroButtonPrimaryText}>
                  Ver projetos
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.heroButtonSecondary}
                onPress={() =>
                  resumeAction
                    ? handleContactAction(resumeAction)
                    : handleSharePortfolio()
                }
              >
                <Feather name="download" size={16} color="#fff" />
                <ThemedText style={styles.heroButtonSecondaryText}>
                  Baixar currículo
            </ThemedText>
              </TouchableOpacity>
            </View>
          <View style={styles.heroSocialRow}>
            {SOCIAL_LINKS.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={styles.heroSocialButton}
                onPress={() => handleSocialPress(social.url)}
              >
                <Feather name={social.icon} size={18} color="#fff" />
              </TouchableOpacity>
            ))}
          </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.kpiRow}>
          {[
            { label: "Repositórios", value: user?.public_repos ?? "--" },
            { label: "Seguidores", value: user?.followers ?? "--" },
          ].map((item) => (
          <View
              key={item.label}
              style={[
                styles.kpiCard,
                {
                  borderColor: palette.text + "12",
                  backgroundColor:
                    colorScheme === "dark" ? palette.surfaceMuted : palette.surface,
                  shadowColor: colorScheme === "dark" ? "transparent" : "#000",
                  shadowOpacity: colorScheme === "dark" ? 0 : 0.08,
                  shadowRadius: colorScheme === "dark" ? 0 : 10,
                  shadowOffset: { width: 0, height: colorScheme === "dark" ? 0 : 4 },
                  elevation: colorScheme === "dark" ? 0 : 3,
              alignItems: "center",
                },
              ]}
            >
              <ThemedText style={styles.kpiValue}>{item.value}</ThemedText>
              <ThemedText style={styles.kpiLabel}>{item.label}</ThemedText>
          </View>
          ))}
        </View>

        <Section
          title="Resumo profissional"
          subtitle="Versão pocket do currículo"
        >
          <View style={[styles.card, { borderColor: palette.text + "10" }]}>
            {SUMMARY_POINTS.map((point) => (
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
          <View style={styles.quickTagRow}>
            {QUICK_TAGS.map((tag) => (
              <View
                key={tag}
                style={[
                  styles.tagPill,
                  {
                    borderColor: palette.text + "20",
                    backgroundColor: palette.text + "08",
                  },
                ]}
              >
                <ThemedText style={styles.tagPillText}>{tag}</ThemedText>
              </View>
            ))}
          </View>
        </Section>

        <Section
          title="Experiência recente"
          subtitle="Linha do tempo das últimas entregas"
        >
          <Animated.View
            style={{
              gap: 12,
              opacity: experienceAnimation,
              transform: [{ translateY: experienceTranslate }],
            }}
          >
            {timelineData.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.timelineCard,
                  { borderColor: item.accent + "70" },
                ]}
              >
                <View
                  style={[
                    styles.timelineBadge,
                    { backgroundColor: item.accent + "20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as MaterialIconName}
                    size={20}
                    color={item.accent}
                  />
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <ThemedText style={styles.timelineTitle}>
                      {item.title}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.timelinePeriod,
                        { color: item.accent },
                      ]}
                    >
                      {item.period}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.timelineDescription}>
                    {item.description}
                      </ThemedText>
                    </View>
              </View>
            ))}
          </Animated.View>
        </Section>

        <Section
          title="Contato rápido"
          subtitle="Toque para falar comigo agora"
        >
          <View style={styles.contactGrid}>
            {CONTACT_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.id}
                      style={[
                  styles.contactCard,
                  {
                    borderColor: palette.text + "12",
                    backgroundColor:
                      colorScheme === "dark"
                        ? palette.surfaceMuted
                        : palette.surface,
                  },
                ]}
                onPress={() => handleContactAction(action)}
              >
                <LinearGradient
                  colors={[
                    palette.tint,
                    colorScheme === "dark" ? palette.tintAlt : palette.tint + "CC",
                  ]}
                  style={styles.contactIcon}
                >
                  <Feather name={action.icon} size={18} color="#fff" />
                </LinearGradient>
                <ThemedText style={styles.contactLabel}>
                  {action.label}
                        </ThemedText>
              </TouchableOpacity>
                      ))}
                  </View>
        </Section>

        <Section
          title="Formação e cursos"
          subtitle="Base acadêmica + certificações"
        >
          <View style={[styles.card, { borderColor: palette.text + "15" }]}>
            {FORMATION_ITEMS.map((item) => (
              <View key={item.title} style={styles.summaryRow}>
                <View
                  style={[
                    styles.summaryDot,
                    { backgroundColor: palette.tint },
                  ]}
                />
                <View>
                  <ThemedText style={styles.summaryText}>{item.title}</ThemedText>
                  <ThemedText style={styles.coursePlace}>{item.place}</ThemedText>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.courseList}>
            {COURSE_ITEMS.map((course) => (
              <ThemedText key={course} style={styles.courseItem}>
                • {course}
              </ThemedText>
            ))}
        </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 48,
    paddingHorizontal: 20,
    gap: 28,
  },
  heroGradient: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  heroAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
  },
  heroTitleGroup: {
    flex: 1,
    gap: 4,
  },
  heroName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#fff",
  },
  heroRole: {
    color: "rgba(255,255,255,0.85)",
  },
  heroEmail: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
  },
  heroIntro: {
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
  },
  heroChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  heroChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  heroChipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  heroButtons: {
    margin: -10,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  heroSocialRow: {
    flexDirection: "row",
    gap: 8,
  },
  heroSocialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  heroButtonPrimary: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  heroButtonPrimaryText: {
    fontWeight: "700",
    color: "#141414",
  },
  heroButtonSecondary: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  heroButtonSecondaryText: {
    fontWeight: "700",
    color: "#fff",
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  kpiCard: {
    flexBasis: "48%",
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  kpiLabel: {
    fontSize: 12,
    opacity: 0.65,
    textTransform: "uppercase",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  sectionAccent: {
    width: 4,
    borderRadius: 999,
    backgroundColor: "#FF8C00",
    height: 28,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
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
  timelineCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 14,
    alignItems: "flex-start",
  },
  timelineBadge: {
    width: 42,
    height: 42,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineContent: {
    flex: 1,
    gap: 4,
  },
  timelineHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  timelinePeriod: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: -8,
    textTransform: "uppercase",
  },
  timelineDescription: {
    fontSize: 14,
    opacity: 0.85,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactCard: {
    flexBasis: "48%",
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    gap: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  contactLabel: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  socialLabel: {
    fontWeight: "600",
  },
  quickTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagPillText: {
    fontSize: 12,
    fontWeight: "600",
  },
  courseList: {
    gap: 6,
  },
  courseItem: {
    fontSize: 14,
    opacity: 0.85,
  },
  coursePlace: {
    fontSize: 13,
    opacity: 0.7,
  },
});

