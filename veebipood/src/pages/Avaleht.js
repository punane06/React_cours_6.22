import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
  //   const tootedLocalStoragest = localStorage.getItem("toodeteVoti");
  // const tootedLocalStoragest =
  // JSON.parse(localStorage.getItem("toodeteVoti")) || [];
  const [tooted, uuendaTooted] = useState([]);

  const dbUrl =
    "https://react-june-default-rtdb.europe-west1.firebasedatabase.app/tooted.json";
  useEffect(() => {
    fetch(dbUrl)
      .then((tagastus) => tagastus.json())
      .then((sisu) => {
        // uuendaTooted(sisu);
        console.log(sisu);
        const fBaseTooted = [];
        for (const key in sisu) {
          fBaseTooted.push(sisu[key]);
        }
        uuendaTooted(fBaseTooted);
      });
  }, []);

  console.log("Tuleb alati ennem");
  console.log(tooted);

  const lisaOstukorvi = (klikitudToode) => {
    // let ostukorciTooted =
    let ostukorv = sessionStorage.getItem("ostukorviTooted");
    ostukorv = JSON.parse(ostukorv) || [];
    ostukorv.push(klikitudToode);
    ostukorv = JSON.stringify(ostukorv);
    sessionStorage.setItem("ostukorviTooted", ostukorv);
  };
  return (
    <div>
      {tooted.map((e) => (
        <div key={e.nimi}>
          <Link to={`/toode/${e.nimi.toLowerCase().replaceAll(" ", "-")}`}>
            {/* <Link to={"/toode/" + e.nimi}> */}
            <div>{e.nimi}</div>
            <div>{e.hind}</div>
            <div>{e.aktiivne}</div>
          </Link>
          <button onClick={() => lisaOstukorvi(e)}>Lisa ostukorvi</button>
        </div>
      ))}
    </div>
  );
}

export default Avaleht;
