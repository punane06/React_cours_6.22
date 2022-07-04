import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Avaleht from "./pages/Avaleht";
import MuudaToode from "./pages/MuudaToode";
import Ostukorv from "./pages/Ostukorv";
import Poed from "./pages/Poed";
import TooteLisamine from "./pages/TooteLisamine";
import VaataTooteid from "./pages/VaataTooteid";
import YksikToode from "./pages/YksikToode";

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
      <Link to="/toode">
        <button>Vaata tooteid</button>
      </Link>
      <Routes>
        {/* localhost:3000/     HTML */}
        <Route path="" exact element={<Avaleht />} />
        <Route path="ostukorv" exact element={<Ostukorv />} />
        <Route path="lisa-toode" exact element={<TooteLisamine />} />
        <Route path="poed" exact element={<Poed />} />
        <Route path="toode" exact element={<VaataTooteid />} />
        <Route path="toode/:tooteNimi" exact element={<YksikToode />} />
        <Route path="muuda/:nimi" exact element={<MuudaToode />} />
      </Routes>
    </div>
  );
}

export default App;
