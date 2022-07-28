import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

function PaymentCompleted() {
  const url = window.location.href;
  console.log(url);
  const [paymentState, setPaymentState] = useState("");

  const order_reference = url.split("order_reference=")[1].split("&")[0];
  console.log(order_reference);

  const payment_reference = url.split("payment_reference=")[1];
  console.log(payment_reference);

  useEffect(() => {
    const api = new WooCommerceRestApi({
      url: "http://localhost/wordpress",
      consumerKey: "ck_e579c4b53ed236a7b40db9da3a3c11cb70b34a26",
      consumerSecret: "cs_5ab1592ea33add3f6bf53df16b5d66139f112e3f",
      version: "wc/v3",
    });
    fetch(
      "https://igw-demo.every-pay.com/api/v4/payments/" +
        payment_reference +
        "?api_username=92ddcfab96e34a5f",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.payment_state);
        let status;
        if (status === "settled") {
          status = "processing";
          setPaymentState("settled");
        } else if (status === "failed") {
          status = "failed";
          setPaymentState("failed");
        }
        api
          .post("orders/" + data.order_reference, { status: status })
          .then((res) => console.log(res));
      });
  }, [payment_reference]);

  return (
    <div>
      <div>Tellimuse nr: {order_reference}</div>
      <div>Makse: {paymentState}</div>
      {paymentState === "settled" && <div>Tellimus jõuab sinuni lähiajal</div>}
      {paymentState === "failed" && <div>Makse ei õnnestunud</div>}
    </div>
  );
}

export default PaymentCompleted;
