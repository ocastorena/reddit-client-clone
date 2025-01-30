import Navbar from "../components/Navbar/Navbar";
import PostsFeed from "../features/postsFeed/PostsFeed";
import Subreddits from "../features/subreddits/Subreddits";

function App() {
  return (
    <>
      <header className="bg-dark p-4 fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>
      <main className="grid grid-cols-4 gap-4 p-5 mt-16">
        <aside className="col-span-1"></aside>
        <section className="col-span-2 grid justify-center">
          <PostsFeed />
        </section>
        <aside className="col-span-1">
          <div className="sticky top-21">
            <Subreddits />
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
