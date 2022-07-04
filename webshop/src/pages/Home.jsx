import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import SortButtons from "./components/SortButtons";

// ffc
function Home() {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  const productDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  //   uef
  useEffect(() => {
    fetch(productDb)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
      });
  }, []);

  const addToCart = (productClicked) => {
    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cartProducts.findIndex(
      (e) => e.product.id === productClicked.id
    );
    if (index >= 0) {
      // Koik need kolm varianti tapselt identsed
      //   cartProducts[index].quantity = cartProducts[index].quantity + 1;
      //   cartProducts[index].quantity ++;
      cartProducts[index].quantity += 1;
    } else {
      cartProducts.push({ product: productClicked, quantity: 1 });
    }
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    toast.success(t("home.cart-added"), {
      theme: "dark",
    });
  };

  // const sortAZ = () => {
  //   products.sort((a, b) => a.name.localeCompare(b.name));
  //   setProducts(products.slice());
  // };
  // const sortZA = () => {
  //   products.sort((a, b) => b.name.localeCompare(a.name));
  //   setProducts(products.slice());
  // };
  // const sortPriceAsc = () => {
  //   products.sort((a, b) => a.price - b.price);
  //   setProducts(products.slice());
  // };
  // const sortPriceDesc = () => {
  //   products.sort((a, b) => b.price - a.price);
  //   setProducts(products.slice());
  // };

  // props
  // <ChildClass VOTI1={muutuja} VOTI2={muutuja} /> - muutuja v]i funktsioon

  return (
    <div>
      <SortButtons products={products} updateProducts={setProducts} />
      {products.map((e, index) => (
        <div key={e.id + index}>
          <img src={e.imgSrc} alt="" />
          <div>{e.imgSrc}</div>
          <div>{e.name}</div>
          <div>{e.price}</div>
          <div>{e.id}</div>
          <button onClick={() => addToCart(e)}>
            {t("home.add-cart-button")}
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}

export default Home;
