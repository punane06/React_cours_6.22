import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Avaleht from "./pages/Avaleht";
import Ostukorv from "./pages/Ostukord";
import Poed from "./pages/Poed";
import TooteLisamine from "./pages/TooteLisamine";

function App() {
  return (
    <div className="App">
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/Ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      <Link to="/poed">
        <button>Poed</button>
      </Link>
      <Routes>
        {/* localhost:3000/     HTML */}
        <Route path="" exact element={<Avaleht />} />
        <Route path="ostukorv" exact element={<Ostukorv />} />
        <Route path="lisa-toode" exact element={<TooteLisamine />} />
        <Route path="poed" exact element={<Poed />} />
      </Routes>
    </div>
  );
}

export default App;
