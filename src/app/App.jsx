import Navbar from "../components/Navbar/Navbar";
import PostsFeed from "../features/postsFeed/PostsFeed";
import Subreddits from "../features/subreddits/Subreddits";
import Sidebar from "../components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <header className="bg-dark p-4 fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </header>
      <main className="grid grid-cols-4 gap-4 p-5 mt-[6vh]">
        <aside className="hidden md:block col-span-1">
          <div className="sticky">
            <Sidebar />
          </div>
        </aside>
        <section className="col-span-4 md:col-span-2 m-auto overflow-auto h-[90vh]">
          <PostsFeed />
        </section>
        <aside className="hidden md:block col-span-1">
          <div className="sticky">
            <Subreddits />
          </div>
        </aside>
      </main>
    </>
  );
}

export default App;
