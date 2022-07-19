import "./App.css";
// import ProductsFromWordpress from "./products.json";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePages";

function App() {
  // const products = ProductsFromWordpress;
  return (
    <div className="App">
      <Link to="/">
        <Button>Avalehele</Button>
      </Link>
      <Link to="/ostukorv">
        <Button>Ostukorvi</Button>
      </Link>
      <Routes>
        <Route
          path=""
          exact
          element={
            <div>
              <HomePage />
            </div>
          }
        ></Route>
        <Route
          path="ostukorv"
          exact
          element={
            <div>
              <Cart />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
