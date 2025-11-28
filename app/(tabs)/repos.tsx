import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  RefreshControl,
  Animated,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getRepos, type RepoSummary } from "@/api/github";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function ReposScreen() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? "light"];
  const insets = useSafeAreaInsets();
  const [repos, setRepos] = useState<RepoSummary[]>([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos");
  const cardsOpacity = useRef(new Animated.Value(0)).current;

  const fetchRepos = useCallback(
    async (pageToLoad: number, mode: "replace" | "append") => {
      try {
        const data = await getRepos(pageToLoad);
        setRepos((prev) =>
          mode === "replace" ? data : [...prev, ...data]
        );
        setPage(pageToLoad);
      } catch {
        Alert.alert(
          "Ops!",
          "Não consegui carregar os repositórios agora. Tente novamente em instantes."
        );
      }
    },
    []
  );

  useEffect(() => {
    const bootstrap = async () => {
      await fetchRepos(1, "replace");
      setInitialLoading(false);
    };
    bootstrap();
  }, [fetchRepos]);

  const handleLoadMore = async () => {
    if (loadingMore || refreshing || initialLoading) return;
    setLoadingMore(true);
    await fetchRepos(page + 1, "append");
    setLoadingMore(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRepos(1, "replace");
    setRefreshing(false);
  };

  const uniqueLanguages = useMemo(() => {
    const map = new Map<string, number>();
    repos.forEach((repo) => {
      repo.languages.forEach((language) => {
        map.set(language, (map.get(language) ?? 0) + 1);
      });
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [repos]);

  const filterOptions = useMemo(
    () => ["Todos", ...uniqueLanguages.map(([language]) => language)],
    [uniqueLanguages]
  );

  const filteredRepos = useMemo(() => {
    if (selectedFilter === "Todos") {
      return repos;
    }
    return repos.filter((repo) => repo.languages.includes(selectedFilter));
  }, [repos, selectedFilter]);

  useEffect(() => {
    Animated.timing(cardsOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    return () => cardsOpacity.setValue(0);
  }, [filteredRepos, cardsOpacity, selectedFilter]);

  const openRepo = async (url: string) => {
    try {
      await Haptics.selectionAsync();
      await Linking.openURL(url);
    } catch {
      Alert.alert("Não foi possível abrir o repositório agora.");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: palette.background }}
      edges={["top", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: 100 + insets.bottom },
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>Projetos & código aberto</ThemedText>
          <ThemedText style={styles.subtitle}>
            Alguns dos trabalhos e experimentos que mantenho públicos no GitHub.
          </ThemedText>
        </View>

        <View style={styles.filterRow}>
          {filterOptions.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.filterChip,
                {
                  borderColor:
                    selectedFilter === language
                      ? palette.tint
                      : palette.text + "30",
                  backgroundColor:
                    selectedFilter === language
                      ? palette.tint + "25"
                      : colorScheme === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : palette.text + "08",
                },
              ]}
              onPress={() => setSelectedFilter(language)}
            >
              <ThemedText style={styles.filterChipText}>
                {language === "Jupyter Notebook" ? "Jupyter" : language}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {initialLoading ? (
          <View style={styles.loadingBox}>
            <ThemedText style={styles.subtitle}>
              Carregando repositórios...
            </ThemedText>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.repoList,
              {
                opacity: cardsOpacity,
              },
            ]}
          >
            {filteredRepos.map((repo, index) => (
              <TouchableOpacity
                key={`${repo.name}-${repo.updatedAt}-${index}`}
                style={[
                  styles.repoCard,
                  {
                    borderColor: palette.text + "15",
                    backgroundColor:
                      colorScheme === "dark"
                        ? palette.surfaceMuted
                        : palette.surface,
                    shadowColor: colorScheme === "dark" ? "transparent" : "#000",
                    shadowOpacity: colorScheme === "dark" ? 0 : 0.08,
                    shadowRadius: colorScheme === "dark" ? 0 : 10,
                    shadowOffset: { width: 0, height: colorScheme === "dark" ? 0 : 4 },
                    elevation: colorScheme === "dark" ? 0 : 3,
                  },
                ]}
                onPress={() => openRepo(repo.url)}
                activeOpacity={0.9}
              >
                <View style={styles.repoHeader}>
                  <View>
                    <ThemedText style={styles.repoName}>{repo.name}</ThemedText>
                    <ThemedText style={styles.repoDate}>
                      Atualizado em{" "}
                      {new Date(repo.updatedAt).toLocaleDateString("pt-BR")}
                    </ThemedText>
                  </View>
                  <Feather name="external-link" size={18} color={palette.text} />
                </View>

                <ThemedText style={styles.repoDescription}>
                  {repo.description ?? "Projeto sem descrição cadastrada."}
                </ThemedText>

                <View style={styles.repoMetaRow}>
                  <View style={styles.repoMetaItem}>
                    <Feather name="star" size={14} color={palette.text} />
                    <ThemedText style={styles.repoMetaText}>
                      {repo.stars}
                    </ThemedText>
                  </View>
                  <View style={styles.repoMetaItem}>
                    <Feather name="git-branch" size={14} color={palette.text} />
                    <ThemedText style={styles.repoMetaText}>
                      {repo.forks}
                    </ThemedText>
                  </View>
                  <View style={styles.repoMetaItem}>
                    <Feather name="eye" size={14} color={palette.text} />
                    <ThemedText style={styles.repoMetaText}>
                      {repo.watchers}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.languageRow}>
                  {repo.languages.slice(0, 4).map((language) => (
                    <View
                      key={`${repo.name}-${repo.updatedAt}-${language}`}
                      style={[
                        styles.languageChip,
                        { borderColor: palette.text + "30" },
                      ]}
                    >
                      <ThemedText style={styles.languageChipText}>
                        {language === "Jupyter Notebook" ? "Jupyter" : language}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
            {filteredRepos.length === 0 ? (
              <ThemedText style={styles.subtitle}>
                Nenhum repositório com o filtro selecionado.
              </ThemedText>
            ) : null}
          </Animated.View>
        )}

        <TouchableOpacity
          style={[
            styles.loadMore,
            {
              backgroundColor: palette.tint,
              opacity: loadingMore ? 0.6 : 1,
            },
          ]}
          onPress={handleLoadMore}
          disabled={loadingMore || initialLoading}
        >
          <ThemedText style={styles.loadMoreText}>
            {loadingMore ? "Carregando..." : "Carregar mais"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.githubButton}
          onPress={() => openRepo("https://github.com/AllyssonCidade")}
        >
          <Feather name="github" size={18} color={palette.text} />
          <ThemedText style={styles.githubButtonText}>
            Ver tudo no GitHub
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.75,
    lineHeight: 20,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  repoList: {
    gap: 16,
  },
  loadingBox: {
    paddingVertical: 40,
    alignItems: "center",
  },
  repoCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    gap: 12,
  },
  repoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  repoName: {
    fontSize: 18,
    fontWeight: "700",
  },
  repoDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  repoDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.85,
  },
  repoMetaRow: {
    flexDirection: "row",
    gap: 10,
  },
  repoMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  repoMetaText: {
    fontSize: 13,
    fontWeight: "600",
  },
  languageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  languageChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  loadMore: {
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "700",
  },
  githubButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  githubButtonText: {
    fontWeight: "700",
  },
});

