function Avaleht() {
  //   const tootedLocalStoragest = localStorage.getItem("toodeteVoti");
  const tootedLocalStoragest =
    JSON.parse(localStorage.getItem("toodeteVoti")) || [];

  const lisaOstukorvi = (klikitudToode) => {
    // let ostukorciTooted =
    ostukordiTooted;
    sessionStorage.setItem("ostukorviTooted", ostukordiTootedSessionist);
  };
  return (
    <div>
      {tootedLocalStoragest.map((e) => (
        <div>
          {e}
          <button onClick={() => lisaOstukorvi()}></button>
        </div>
      ))}
    </div>
  );
}

export default Avaleht;
