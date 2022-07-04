import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VaataTooteid() {
  //   const tootedLocalStoragest = localStorage.getItem("toodeteVoti");
  //   const tootedLocalStoragest =
  //     JSON.parse(localStorage.getItem("toodeteVoti")) || [];

  // const [tootedLocalStoragest, muudaTooted] = useState(
  //   JSON.parse(localStorage.getItem("toodeteVoti")) || []
  // );

  const [tooted, muudaTooted] = useState([]);

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
        muudaTooted(fBaseTooted);
      });
  }, []);

  const kustutaToode = (index) => {
    tooted.splice(index, 1);
    // localStorage.setItem("toodeteVoti", JSON.stringify(tootedLocalStoragest));
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(tooted),
      heade: {
        "Content-Type": "application/json",
      },
    });
    muudaTooted(tooted.slice());
  };

  return (
    <div>
      {tooted.map((e, index) => (
        <div key={e.nimi}>
          <div>{e.nimi}</div>
          <div>{e.hind}</div>
          <div>{e.aktiivne}</div>
          {/* <Link to={`/muuda/${e.nimi.toLowerCase().replaceAll(" ", "-")}`}> */}
          <button>Muuda</button>
          {/* </Link> */}
          <button onClick={() => kustutaToode(index)}>Kustuta</button>
        </div>
      ))}
    </div>
  );
}

export default VaataTooteid;
