import { ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Avatar, Divider } from "@rneui/themed";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { getRepos, getUserData } from "@/api/github";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

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

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserData();
      const reposData = await getRepos();
      setUser(userData);
      setRepos(reposData);
    };

    fetchData();
  }, []);

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
          gap: 16,
          marginBottom: 30,
        }}
      >
        <Avatar
          size={100}
          rounded
          source={{ uri: "https://github.com/AllyssonCidade.png" }}
          title="Allysson Cidade"
        />
        <View style={{ alignItems: "center", gap: 2 }}>
          <ThemedText style={{ fontWeight: "bold", fontSize: 16 }}>
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
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.public_repos}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Repositorys</ThemedText>
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
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.followers}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Followers</ThemedText>
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
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>
            {user?.following}
          </ThemedText>
          <ThemedText style={{ fontWeight: "bold" }}>Following</ThemedText>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 40,
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
              textAlign: "center",
              flexBasis: "40%",
              marginTop: 20,
            }}
          >
            Repositorys
          </ThemedText>
          <Divider
            style={{
              height: 0.5,
              flexBasis: "30%",
              backgroundColor: Colors[colorScheme!].text,
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {repos.map((repo) => (
            <View
              key={repo.name}
              style={{
                width: "100%",
                marginVertical: 10,
              }}
            >
              <Link href={repo.url} target="_blank">
                <ThemedText style={{ fontWeight: "bold" }}>
                  {repo.name}
                </ThemedText>
              </Link>
              <ThemedText>{repo.description}</ThemedText>
              <ThemedText>{repo.languages}</ThemedText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
