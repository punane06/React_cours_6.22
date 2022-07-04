import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function YksikToode() {
  const { tooteNimi } = useParams();
  //   console.log(tooteNimi);
  // const tooted = JSON.parse(localStorage.getItem("toodeteVoti")) || {};

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

  const toode = tooted.find(
    (e) => e.nimi.toLowerCase().replaceAll(" ", "-") === tooteNimi
  );

  return (
    <div>
      {toode && (
        <div>
          <div>{toode.nimi}</div>
          <div>{toode.hind}</div>
        </div>
      )}
      {!toode && <div>Toodet ei leitud</div>}
    </div>
  );
}

export default YksikToode;
