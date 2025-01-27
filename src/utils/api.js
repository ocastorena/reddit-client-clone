const BASE_URL = "https://www.reddit.com";

export const fetchPosts = async (subreddit) => {
  try {
    const response = await fetch(`${BASE_URL}/r/${subreddit}.json`);
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const fetchPopularSubreddits = async () => {
  try {
    const response = await fetch(`${BASE_URL}/subreddits/popular.json`);
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  } catch (error) {
    console.error("Failed to fetch popular subreddits:", error);
    throw error;
  }
};
