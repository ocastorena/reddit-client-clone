import Navbar from "./components/Navbar";
import Feed from "./components/Feed";

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

function App() {
  return (
    <>
      <header className="bg-dark p-4">
        <Navbar />
      </header>
      <main className="grid grid-cols-12 gap-4 p-5">
        <aside className="col-span-4"></aside> {/* Left column */}
        <section className="col-span-4">
          <Feed posts={posts} />
        </section>
        <aside className="col-span-2"></aside> {/* Right column */}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
