import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Avaleht from "./pages/Avaleht";
import Ostukorv from "./pages/Ostukord";

function App() {
  return (
    <div className="App">
      <Link to="/avaleht">
        <button>Avalehele</button>
      </Link>
      <Link to="/Ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Routes>
        {/* localhost:3000/avaleht     HTML */}
        <Route path="avaleht" element={<Avaleht />} />
        <Route path="ostukorv" element={<Ostukorv />} />
      </Routes>
    </div>
  );
}

export default App;
