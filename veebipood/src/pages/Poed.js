function Poed() {
  return (
    <div>
      <div>Poe nimi: Kristiine outlet</div>
      <div>Poe aukoht: Kristiine keskus</div>
      <div>Poe lahtiolekuaeg: E-P 10-22</div>
      <br />
      <div>Poe nimi: Mustamäe outlet</div>
      <div>Poe aukoht: Mustamäe keskus</div>
      <div>Poe lahtiolekuaeg: E-P 10-22</div>
      <br />
      <div>Poe nimi: Ülemiste outlet</div>
      <div>Poe aukoht: Ülemiste keskus</div>
      <div>Poe lahtiolekuaeg: E-P 10-22</div>
      <br />
      <div>Poe nimi: Tasku outlet</div>
      <div>Poe aukoht: Tasku keskus</div>
      <div>Poe lahtiolekuaeg: E-P 10-22</div>
      <br />
      <br />
      <div>Meie meeskond:</div>
      <br />
      {["Mart Poom", "Aavo Pärt", "Kertu Jukkum"]
        .sort((a, b) => b - a)
        .map((e) => (
          <div key={e}>
            <div>Liikme nimi: {e}</div>
            <div>Valdkond: Turundus</div>
            <div>Asukoht: Peakntor</div>
          </div>
        ))}
    </div>
  );
}

export default Poed;
