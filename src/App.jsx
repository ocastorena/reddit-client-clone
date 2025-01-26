import Navbar from "./components/Navbar";
import Card from "./components/Card";

function App() {
  return (
    <>
      <header className="bg-dark p-4">
        <Navbar />
      </header>
      <body className="m-5">
        <Card />
      </body>
      <footer></footer>
    </>
  );
}

export default App;
