import { GITHUB_TOKEN } from "@env";

const username = "AllyssonCidade";
const URL = `https://api.github.com/users/${username}`;

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

const authHeaders: Record<string, string> =
  GITHUB_TOKEN && GITHUB_TOKEN.trim().length > 0
    ? {
        Authorization: `Bearer ${GITHUB_TOKEN.trim()}`,
        "User-Agent": "allysson-portfolio-app",
      }
    : {};

const buildHeaders = () => ({
  ...defaultHeaders,
  ...authHeaders,
});

type GithubRepoResponse = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  pushed_at: string;
  updated_at: string;
};

type GithubUserResponse = {
  name: string;
  url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type RepoSummary = {
  name: string;
  description: string | null;
  url: string;
  languages: string[];
  stars: number;
  forks: number;
  watchers: number;
  updatedAt: string;
  pushedAt: string;
};

const FALLBACK_USER: GithubUserResponse = {
  name: "Allysson Cidade",
  url: "https://github.com/AllyssonCidade",
  bio: "Desenvolvedor Mobile com foco em React Native, Kotlin e integrações para terminais POS.",
  public_repos: 69,
  followers: 16,
  following: 15,
};

const FALLBACK_REPOS: RepoSummary[] = [
  {
    name: "my_repo_app",
    description:
      "Meu portfólio pessoal com React Native. Disponível para download no Google Play Store.",
    url: "https://github.com/AllyssonCidade/my_repo_app",
    languages: ["React Native", "TypeScript"],
    stars: 58,
    forks: 6,
    watchers: 12,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
  },
  {
    name: "GithubSearch",
    description: "um App Android para compartilhar portfolio de projetos do github.",
    url: "https://github.com/AllyssonCidade/GithubSearch",
    languages: ["Kotlin"],
    stars: 73,
    forks: 11,
    watchers: 20,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
  },
  {
    name: "portfolio-web",
    description: "Portfólio web com Next.js e animações framer-motion.",
    url: "https://github.com/AllyssonCidade/portfolio-web",
    languages: ["Next.js", "TailwindCSS"],
    stars: 41,
    forks: 5,
    watchers: 9,
    updatedAt: new Date().toISOString(),
    pushedAt: new Date().toISOString(),
  },
];

async function getUserData() {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: buildHeaders(),
    });

    if (!response.ok) {
      throw new Error("Falha ao carregar usuário do GitHub");
    }

    const data: GithubUserResponse = await response.json();
    return {
      name: data.name,
      url: data.url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch (error) {
    console.warn("Usando dados locais para o usuário do GitHub", error);
    return FALLBACK_USER;
  }
}

async function getLanguages(repoName: string) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`,
    {
      method: "GET",
      headers: buildHeaders(),
    }
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return Object.keys(data);
}

async function getRepos(page: number) {
  try {
    const response = await fetch(
      `${URL}/repos?per_page=5&page=${page}&sort=updated&direction=desc`,
      {
        method: "GET",
        headers: buildHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao carregar repositórios do GitHub");
    }

    const data: GithubRepoResponse[] = await response.json();

    const repos: RepoSummary[] = await Promise.all(
      data.map(async (repo) => {
        const languages = await getLanguages(repo.name);
        return {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          languages,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          watchers: repo.watchers_count,
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
        };
      })
    );

    return repos;
  } catch (error) {
    console.warn("Usando repositórios locais enquanto GitHub não responde", error);
    return FALLBACK_REPOS;
  }
}

export { getUserData, getRepos };

