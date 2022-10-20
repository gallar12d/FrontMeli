import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import Results from "./components/Results";
import Details from "./components/Details";

function App(): JSX.Element {
  return (
    <div className="App app_container">
      <Search />
      <Routes>
        <Route path="/items" element={<Results />} />
        <Route path="/items/:id" element={<Details />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
