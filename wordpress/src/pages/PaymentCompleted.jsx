import { useEffect, useState } from "react";

function PaymentCompleted() {
  const url = window.location.href;
  console.log(url);

  const order_reference = url.split("order_reference=")[1].split("&")[0];
  console.log(order_reference);

  const payment_reference = url.split("payment_reference=")[1];
  console.log(payment_reference);

  const [paymentState, setPaymentState] = useState("");

  useEffect(() => {
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
        console.log(data);
        setPaymentState(data.payment_state);
        // fetch wordpress ->
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
