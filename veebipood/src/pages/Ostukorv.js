import { useState } from "react";

function Ostukorv() {
  // const ostukorviTooted =
  //   JSON.parse(sessionStorage.getItem("ostukorviTooted")) || [];
  const [ostukorviTooted, uuendaOstukorvi] = useState(
    JSON.parse(sessionStorage.getItem("ostukorviTooted")) || []
  );
  const lisaOstukorvi = (klikitudToode) => {
    ostukorviTooted.push(klikitudToode); //Lisab juurde
    uuendaOstukorvi(ostukorviTooted.slice()); //uuenda HTMLi *teeb koopia*
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted)); //Salvestab mällu
  };
  const kustutaOstukorvist = (klikitudToode) => {
    const jarjekorraNumber = ostukorviTooted.indexOf(klikitudToode);
    ostukorviTooted.splice(jarjekorraNumber, 1); //kustutaj jarjekorra numbri alusel  ja pean ytlema et 1 tk
    // ostukorviTooted.push(klikitudToode); //Lisab juurde
    uuendaOstukorvi(ostukorviTooted.slice()); //uuenda HTMLi *teeb koopia*
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted)); //Salvestab mällu
  };

  const tyhjenda = () => {
    uuendaOstukorvi([]);
    sessionStorage.setItem("ostukorviTooted", JSON.stringify([])); //Salvestab mällu
  };
  const arvutaKogusumma = () => {
    let ostukorviSumma = 0;
    // googelda js calculate object array total
    ostukorviTooted.forEach((e) => {
      ostukorviSumma = ostukorviSumma + Number(e.hind);
    });
    return ostukorviSumma;
  };

  const maksma = () => {
    const makseAndmed = {
      api_username: "92ddcfab96e34a5f",
      account_name: "EUR3D1",
      amount: arvutaKogusumma(),
      order_reference: Math.floor(Math.random() * 899999 + 100000),
      nonce:
        "a9b7f7e7154a01b" +
        Math.floor(Math.random() * 899999 + 100000) +
        new Date(),
      timestamp: new Date(),
      customer_url: "https://react-06-22.web.app",
    };
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(makseAndmed),
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
      <button onClick={() => tyhjenda()}>Tühjenda ostukord</button>
      {ostukorviTooted.map((e) => (
        <div key={e.nimi}>
          <div>{e.nimi}</div>
          <div>{e.hind}</div>
          {/* Seda ta ei kuva välja, kuna ta on boolean tüüpi (kui panna + 1, siis
          näeb 1 või 2) */}
          <div>{e.aktiivne}</div>
          <button onClick={() => lisaOstukorvi(e)}>Lisa</button>
          <button onClick={() => kustutaOstukorvist(e)}>Kustuta</button>
        </div>
      ))}
      <div>Kokku: {arvutaKogusumma()} €</div>
      <button onClick={() => maksma()}>Maksma</button>
    </div>
  );
}

export default Ostukorv;
