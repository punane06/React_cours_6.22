import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Avaleht from "./pages/Avaleht";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Routes>
        {/* localhost:3000/     HTML */}
        <Route path="" exact element={<Avaleht />} />
      </Routes>
    </div>
  );
}

export default App;
