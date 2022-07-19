import ProductsFromWordpress from "../products.json";
function HomePage() {
  const products = ProductsFromWordpress;

  const addToCart = (productClicked) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = cart.findIndex((e) => e.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity++;
    } else {
      const newProduct = { product: productClicked, quanttity: 1 };
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
