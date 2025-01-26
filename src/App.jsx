import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import PopularSubreddits from "./components/PopularSubreddits";

const posts = [
  {
    id: 1,
    title: "Post 1",
    subreddit: "subreddit1",
    votes: 100,
    time: "30 min ago",
    image: "https://placehold.co/400",
  },
  {
    id: 2,
    title: "Post 2",
    subreddit: "subreddit2",
    votes: 200,
    time: "1 hour ago",
    image: "https://placehold.co/400",
  },
  // Add more posts as needed
];

const popularSubreddits = [
  "AskReddit",
  "worldnews",
  "funny",
  "gaming",
  "aww",
  "pics",
  "science",
  "movies",
  "todayilearned",
  "news",
];

function App() {
  return (
    <>
      <header className="bg-dark p-4 fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>
      <main className="grid grid-cols-12 gap-4 p-5 mt-16">
        <aside className="col-span-2"></aside>
        <section className="col-span-4 col-start-5">
          <Feed posts={posts} />
        </section>
        <aside className="col-span-2 fixed right-80">
          <PopularSubreddits subreddits={popularSubreddits} />
        </aside>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
