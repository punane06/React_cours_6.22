// import ProductsFromWordpress from "../products.json";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { useEffect, useState } from "react";

function HomePage() {
  // const products = ProductsFromWordpress;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress",
      consumerKey: "ck_e579c4b53ed236a7b40db9da3a3c11cb70b34a26",
      consumerSecret: "cs_5ab1592ea33add3f6bf53df16b5d66139f112e3f",
      version: "wc/v3",
      axiosConfig: {
        headers: {},
      },
    });
    api.get("products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = (productClicked) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cart.findIndex((e) => e.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity++;
    } else {
      const newProduct = { product: productClicked, quantity: 1 };
      cart.push(newProduct);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div>
      {products.map((e) => (
        <div key={e.id}>
          <div>{e.id}</div>
          <div>{e.name}</div>
          <div>{e.price} €</div>
          <button onClick={() => addToCart(e)}>Lisa ostukorvi</button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
