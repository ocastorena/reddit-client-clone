import Navbar from "../components/Navbar/Navbar";
import PostsFeed from "../features/postsFeed/PostsFeed";
import PopularSubreddits from "../components/PopularSubreddits/PopularSubreddits";

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
        <section className="col-span-6 col-start-4">
          <PostsFeed />
        </section>
        <aside className="col-span-3">
          <div className="sticky top-21">
            <PopularSubreddits subreddits={popularSubreddits} />
          </div>
        </aside>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
