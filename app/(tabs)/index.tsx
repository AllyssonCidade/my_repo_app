import {
  ScrollView,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar, Divider, Icon } from "@rneui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { getRepos, getUserData, time } from "@/api/github";
import { useEffect, useState } from "react";
import { darken } from "polished";
import { Button } from "@rneui/base";

export interface RepoTypes {
  name: string;
  description: string;
  url: string;
  languages: string;
}

export interface UserTypes {
  name: string;
  url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [repos, setRepos] = useState<RepoTypes[]>([]);
  const [user, setUser] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      const reposData = await getRepos(page);
      setUser(userData);
      setRepos(reposData);
    };

    fetchData();
  }, []);
  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
    const newRepos = await getRepos(page + 1);
    setRepos((prevRepos) => [...prevRepos, ...newRepos]);
    setLoading(false);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <Avatar
          size={90}
          rounded
          source={{ uri: "https://github.com/AllyssonCidade.png" }}
          title="Allysson Cidade"
        />
        <View style={{ alignItems: "center", gap: 2 }}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 18 }}>
            {user?.name}
          </ThemedText>
          <ThemedText style={{ fontSize: 16 }}>
            allyssoncidade@gmail.com
          </ThemedText>
        </View>

        <ThemedText style={{ textAlign: "center", paddingHorizontal: 20 }}>
          {user?.bio}
        </ThemedText>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flexBasis: "30%",
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.public_repos}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Repositórios</ThemedText>
        </View>
        <Divider
          style={{
            width: 0.3,
            backgroundColor: Colors[colorScheme!].text,
            height: "100%",
          }}
        />

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flexBasis: "30%",
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.followers}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Seguidores</ThemedText>
        </View>
        <Divider
          style={{
            width: 0.3,
            backgroundColor: Colors[colorScheme!].text,
            height: "100%",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flexBasis: "30%",
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.following}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Seguindo</ThemedText>
        </View>
      </View>

      <View style={{ paddingBottom: 50 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Divider
            style={{
              height: 0.5,
              flexBasis: "30%",
              backgroundColor: Colors[colorScheme!].text,
            }}
          />
          <ThemedText
            style={{
              fontWeight: "bold",
              fontSize: 26,
              paddingTop: 10,
              textAlign: "center",
              flexBasis: "40%",
            }}
          >
            Repositórios
          </ThemedText>
          <Divider
            style={{
              height: 0.5,
              flexBasis: "30%",
              backgroundColor: Colors[colorScheme!].text,
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {repos.map((repo) => (
            <View
              key={repo.name}
              style={{
                width: "100%",
                marginVertical: 10,
                borderWidth: 1,
                borderColor: Colors[colorScheme!].text,
                borderRadius: 10,
                gap: 12,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomLeftRadius: 10,
                  borderColor: Colors[colorScheme!].text,
                  borderRadius: 10,
                  backgroundColor: darken(0.1, Colors[colorScheme!].background),
                }}
              >
                <Icon
                  name="github"
                  type="font-awesome"
                  size={70}
                  color={Colors[colorScheme!].text}
                />
              </View>

              <View style={{ gap: 12, alignItems: "center" }}>
                {/* NOME DO REPOSITORIO  */}
                <TouchableOpacity
                  onPress={() => Linking.openURL(repo.url)}
                  style={[
                    styles.WrapperLeftTable,
                    { borderBottomColor: Colors[colorScheme!].text },
                  ]}
                >
                  <View
                    style={[
                      styles.LeftTable,
                      { borderRightColor: Colors[colorScheme!].text },
                    ]}
                  >
                    <Icon
                      name="pencil"
                      type="font-awesome"
                      size={20}
                      color={Colors[colorScheme!].text}
                    />
                    <ThemedText style={styles.LeftTableText}>Nome</ThemedText>
                  </View>
                  <ThemedText
                    style={[
                      styles.RightTableText,
                      { borderLeftColor: Colors[colorScheme!].text },
                    ]}
                  >
                    {repo.name}
                  </ThemedText>
                </TouchableOpacity>

                {/* DESCRIÇÃO DO REPOSITORIO  */}
                <View
                  style={[
                    styles.WrapperLeftTable,
                    { borderBottomColor: Colors[colorScheme!].text },
                  ]}
                >
                  <View
                    style={[
                      styles.LeftTable,
                      { borderRightColor: Colors[colorScheme!].text },
                    ]}
                  >
                    <Icon
                      name="info-circle"
                      type="font-awesome"
                      size={20}
                      color={Colors[colorScheme!].text}
                    />
                    <ThemedText style={styles.LeftTableText}>
                      Descrição
                    </ThemedText>
                  </View>

                  <ThemedText
                    style={[
                      styles.RightTableText,
                      { borderLeftColor: Colors[colorScheme!].text },
                    ]}
                  >
                    {repo.description}
                  </ThemedText>
                </View>

                {/* TECNOLOGIAS DO REPOSITORIO  */}
                <View
                  style={[
                    styles.WrapperLeftTable,
                    { borderBottomColor: Colors[colorScheme!].text },
                  ]}
                >
                  <View
                    style={[
                      styles.LeftTable,
                      { borderRightColor: Colors[colorScheme!].text },
                    ]}
                  >
                    {colorScheme === "dark" ? (
                      <Image
                        source={require("@/assets/images/processadorWhite.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    ) : (
                      <Image
                        source={require("@/assets/images/processadorBlack.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    )}
                    <ThemedText style={styles.LeftTableText}>
                      Tecnologias
                    </ThemedText>
                  </View>

                  <ThemedText
                    style={[
                      styles.RightTableText,
                      { borderLeftColor: Colors[colorScheme!].text },
                    ]}
                  >
                    {repo.languages}
                  </ThemedText>
                </View>
              </View>
            </View>
          ))}
          <Button title="Ver mais" type="clear" onPress={handleLoadMore} />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  WrapperLeftTable: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
  },
  LeftTable: {
    flexDirection: "column",
    flexBasis: "26%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  LeftTableText: {
    fontWeight: "500",
    alignItems: "center",
    fontSize: 14,
  },
  RightTableText: {
    fontWeight: "500",
    fontSize: 14,
    flexBasis: "70%",
    textAlign: "left",
    borderLeftWidth: 0.5,
    padding: 10,
    height: "100%",
    marginBottom: 8,
  },
});
