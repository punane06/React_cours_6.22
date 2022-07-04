import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { nimi } = useParams();

  const [tooted, uuendaTooted] = useState([]);

  // const tooted = JSON.parse(localStorage.getItem("toodeteVoti")) || [];
  const toode = tooted.find(
    (e) => e.nimi.toLowerCase().replaceAll(" ", "-") === nimi
  );
  const index = tooted.indexOf(toode);
  const nimiRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();

  const [sonum, maarasonum] = useState("");

  const navigate = useNavigate();

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

  const uuendaToode = () => {
    if (nimiRef.current.value === "") {
      maarasonum("Ei saa ilma nimeta todoet uuendada");
    } else {
      const uuendatudToode = {
        nimi: nimiRef.current.value,
        hind: priceRef.current.value,
        aktiivne: isActiveRef.current.checked,
      };
      //   tootedLocalStorage.push(uusToode);
      tooted[index] = uuendatudToode;
      //   tooted = JSON.stringify(tooted);
      //   määrates on vaja võtit ja vääertust
      // localStorage.setItem("toodeteVoti", JSON.stringify(tooted));
      fetch(dbUrl, {
        method: "PUT",
        body: JSON.stringify(tooted),
        header: {
          "Content-Type": "application/json",
        },
      }).then(() => navigate("/toode"));
      //   maarasonum("Muudetud edukalt toode " + nimiRef.current.value);
    }
  };

  return (
    <div>
      <br />
      {toode && (
        <div>
          <label>Toote nimetus</label>
          <br />
          <input ref={nimiRef} defaultValue={toode.nimi} type="text" />
          <br />
          <label>Toote hind</label>
          <br />
          <input ref={priceRef} defaultValue={toode.hind} type="number" />
          <br />
          <label>Toote aktiivne</label>
          <br />
          <input
            ref={isActiveRef}
            defaultChecked={toode.aktiivne}
            type="checkbox"
          />
          <br />
          <button onClick={uuendaToode}>Sisesta</button>
          <div>{sonum}</div>
        </div>
      )}
      {!toode && <div>Toodet ei leitud</div>}
    </div>
  );
}

export default MuudaToode;
