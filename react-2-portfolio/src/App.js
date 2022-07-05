import { Routes, Route } from "react-router-dom";
import "./App.css";
import Avaleht from "./Avaleht";
import Batman from "./pages/Batman";
import Spiderman from "./pages/Spiderman";
import Superman from "./pages/Superman";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" exact element={<Avaleht />}></Route>
        <Route path="/superman" exact element={<Superman />}></Route>
        <Route path="/spiderman" exact element={<Spiderman />}></Route>
        <Route path="/batman" exact element={<Batman />}></Route>
      </Routes>
    </div>
  );
}

export default App;
