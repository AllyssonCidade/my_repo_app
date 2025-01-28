const username = "AllyssonCidade";
const URL = `https://api.github.com/users/${username}`;

//// GITHUB ////

async function getUserData() {
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return {
    name: data.name,
    url: data.url,
    bio: data.bio,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  };
}
async function time() {
  const response = await fetch("https://api.github.com/rate_limit", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
}
async function getRepos() {
  const response = await fetch(URL + "/repos?sort=updated&direction=desc", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.map((repo) => {
    return {
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      languages: repo.languages,
    };
  });
}

export { getUserData, getRepos, time };
