import { useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(sessionStorage.getItem("cart")) || []
  );

  const api = new WooCommerceRestApi({
    url: "http://localhost/wordpress",
    consumerKey: "ck_e579c4b53ed236a7b40db9da3a3c11cb70b34a26",
    consumerSecret: "cs_5ab1592ea33add3f6bf53df16b5d66139f112e3f",
    version: "wc/v3",
  });

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
      return { product_id: e.product.id, quantity: e.quantity };
    });
    // const wordpressProducts = lineItems.map((e) => e);
    const orderPromise = api
      .post("orders", {
        line_items: lineItems,
      })
      .then((res) => {
        return res.data.id;
      });
    orderPromise.then((result) => pay(result));
    // return Math.floor(Math.random() * 899999 + 100000);
  };

  const calculateTotalSum = () => {
    let cartSum = 0;
    cart.forEach((e) => (cartSum += Number(e.product.price) * e.quantity));

    return cartSum;
  };
  const pay = (orderId) => {
    // const orderId = sendOrderToWordpress();
    const paymentData = {
      api_username: "92ddcfab96e34a5f",
      account_name: "EUR3D1",
      amount: calculateTotalSum(),
      order_reference: orderId,
      nonce: "b9b7f7e7154a01b" + orderId + new Date(),
      timestamp: new Date(),
      customer_url: "https://react-06-22.web.app/tellimus",
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
      .then((res) => res.json())
      .then((data) => (window.location.href = data.payment_link));
  };

  // kontroll:
  // https://igw-demo.every-pay.com/api/v4/payments/7a81ca93109e8c340e6812ae3a43e2804f6d8699a46d9fb5ca5a27bb4f3e8929?api_username=92ddcfab96e34a5f
  // https://igw-demo.every-pay.com/api/v4/payments/7de074173e5e4544a9d3b26d9becc7b9039640329108644e350451b436f0f357?api_username=92ddcfab96e34a5f
  // 92ddcfab96e34a5f
  // 8cd19e99e9c2c208ee563abf7d0e4dad

  return (
    <div>
      {cart.map((e) => (
        <div key={e.product.id}>
          <div>{e.product.name}</div>
          <div>{e.product.price}</div>
          <button onClick={() => decreaseQuantity(e)}>-</button>
          <div>{e.quantity} tk</div>
          <button onClick={() => integrateQuantity(e)}>+</button>
          <div>{e.product.price * e.quantity}</div>
          {/* {console.log(e.product.price)} */}
          {/* {console.log(e.quantity)} */}
          <button onClick={() => deleteQuantity(e)}>x</button>
        </div>
      ))}
      <div>Summa kokku: {calculateTotalSum()}</div>
      <button onClick={() => sendOrderToWordpress()}>Maksma</button>
    </div>
  );
}

export default Cart;
