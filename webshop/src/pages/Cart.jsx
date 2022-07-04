import { useState } from "react";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cart") || [])
  );

  const decreaseFromCart = (productIndex) => {
    cartProducts[productIndex].quantity--;
    if (cartProducts[productIndex].quantity === 0) {
      removeFromCart(productIndex);
    } else {
      setCartProducts(cartProducts.slice());
      sessionStorage.setItem("cart", JSON.stringify(cartProducts));
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const increaseFromCart = (productIndex) => {
    cartProducts[productIndex].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const removeFromCart = (productIndex) => {
    cartProducts.splice(productIndex, 1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cart", JSON.stringify(cartProducts));
  };
  const removeAllItems = () => {
    setCartProducts([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  };
  const calcTotalPayment = () => {
    let shoppingCart = 0;
    cartProducts.forEach((e) => {
      shoppingCart = shoppingCart + Number(e.product.price);
    });
    return shoppingCart;
  };
  console.log({ calcTotalPayment });
  const toPay = () => {
    const paymentData = {
      api_username: "92ddcfab96e34a5f",
      account_name: "EUR3D1",
      amount: calcTotalPayment(),
      order_reference: Math.floor(Math.random() * 899999 + 100000),
      nonce:
        "b9b7f7e7154a01b" +
        Math.floor(Math.random() * 899999 + 100000) +
        new Date(),
      timestamp: new Date(),
      customer_url: "https://react-06-22.web.app",
    };
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      },
    })
      .then((tagastus) => tagastus.json())
      .then((sisu) => (window.location.href = sisu.payment_link));
  };

  return (
    <div>
      {cartProducts.length === 0 && (
        <img
          src="https://www.valeorx.com/static/media/empty-cart.60e68bfd.png"
          alt=""
        />
      )}
      <button onClick={() => removeAllItems(cartProducts)}>
        Tühjenda ostukorv
      </button>
      <br />
      {cartProducts.map((e, index) => (
        <div>
          <img src={e.product.imgSrc} alt="" />
          <div>{e.product.price}</div>
          <button onClick={() => decreaseFromCart(index)}>-</button>
          <div>{e.quantity}</div>
          <button onClick={() => increaseFromCart(index)}>+</button>
          <div>{e.product.price * e.quantity}</div>
          <button onClick={() => removeFromCart(index)}>x</button>
        </div>
      ))}
      <div>{calcTotalPayment()}€</div>
      <button onClick={() => toPay()}>Maksma</button>
    </div>
  );
}

export default Cart;
