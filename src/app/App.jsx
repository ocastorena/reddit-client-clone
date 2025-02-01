import Header from "../components/Navbar/Header";
import PostsFeed from "../features/postsFeed/PostsFeed";
import Subreddits from "../features/subreddits/Subreddits";
import Sidebar from "../components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-4 gap-4 px-4 pt-20 pb-20 w-full h-screen">
        <aside className="hidden sm:block col-span-1 bg-zinc-900 rounded-lg p-4 h-fit">
          <Sidebar />
        </aside>
        <section className="col-span-4 sm:col-span-2 flex flex-col items-center rounded-lg w-full h-full overflow-y-auto">
          <PostsFeed />
        </section>
        <aside className="hidden sm:flex col-span-1 flex-col overflow-y-auto rounded-lg bg-zinc-900">
          <Subreddits />
        </aside>
      </main>
      {/* <footer className="bg-amber-400 w-full h-16 sticky bottom-0"></footer> */}
    </>
  );
}

export default App;
