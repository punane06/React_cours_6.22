import { useState } from "react";

function AvalehtSoendus() {
  //   let synniaeg = "1989.03.25";
  const isikukood = "534534535";
  const [synniaeg, uuendaSynniaeg] = useState("424234");
  const [sonaline, uuendaSonaline] = useState("algvaartus");
  const [numbriline, uuendaNumbriline] = useState(3242342);
  const [kahenvaartus, uuendaKahendvaartus] = useState(true);

  //   loob funtctiooni, kuid käima ei panda, kui leht avatakse
  const muudaSynniaega = () => {
    // synniaeg = "232323";
    uuendaSynniaeg(
      "19" +
        isikukood.substring(1, 3) +
        "." +
        isikukood.substring(3, 5) +
        "." +
        isikukood.substring(5, 7)
    );
    console.log(synniaeg);
  };
  const muudaMuutujad = () => {
    uuendaSonaline("uus");
    uuendaNumbriline(455);
    uuendaKahendvaartus(false);
  };

  return (
    <div>
      <br />
      <div>Isikukood: {isikukood}</div>
      <button onClick={() => muudaSynniaega()}>
        Arvuta sünniaeg isikukoodu jägi
      </button>
      <br />
      <br />
      <div>Sünniaeg: {synniaeg}</div>
      {kahenvaartus && <div>Nimi: Malle Maasikas</div>}
      {numbriline < 1000 && <div>{sonaline}</div>}
      <div>{numbriline}</div>
      <div>{kahenvaartus + kahenvaartus}</div>
      <button onClick={() => muudaMuutujad()}>Muuda koik muutujad</button>
    </div>
  );
}

export default AvalehtSoendus;
