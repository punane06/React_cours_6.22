import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const decreaseQuantity = (productClicked) => {
    const index = cart.findIndex(
      (e) => e.product.id === productClicked.product.id
    );
    cart[index].quantity--;
    if (cart[index].quantity === 0) {
      deleteQuantity(productClicked);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  const integrateQuantity = (productClicked) => {
    const index = cart.findIndex(
      (e) => e.product.id === productClicked.product.id
    );
    cart[index].quantity++;
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  const deleteQuantity = (productClicked) => {
    const index = cart.findIndex(
      (e) => e.product.id === productClicked.product.id
    );
    cart.splice(index, 1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  const sendOrderToWordpress = () => {
    const lineItems = cart.map((e) => {
      return { id: e.product.id, quantity: e.quantity };
    });
    // const wordpressProducts = lineItems.map((e) => e);
    console.log(lineItems);
  };

  // const pay = () => {

  // }

  return (
    <div>
      {cart.map((e) => (
        <div key={e.product.id}>
          <div>{e.product.name}</div>
          <div>{e.product.price}</div>
          <button onClick={() => decreaseQuantity(e)}>-</button>
          <div>{e.product.quantity} tk</div>
          <button onClick={() => integrateQuantity(e)}>+</button>
          <div>{e.product.price * e.quantity}</div>
          <button onClick={() => deleteQuantity(e)}>x</button>
        </div>
      ))}
      <button onClick={() => sendOrderToWordpress()}>Esita tellimus</button>
    </div>
  );
}

export default Cart;
