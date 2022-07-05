import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

function MaintainProduct() {
  const [products, setProducts] = useState([]);
  //   const { t } = useTranslation();

  const productDb =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productDb)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
      });
  }, []);

  const deleteProduct = (index) => {
    products.splice(index, 1);
    setProducts(products.slice());
    fetch(productDb, {
      method: "PUT",
      body: JSON.stringify(products),
      header: {
        "Content-Type": "application/json",
      },
    });
    // splice - [] kustutamiseks/lisamiseks [].splice(3,0,{})
    // slice - [] koopia tegemiseks [.slice(0,10)] -> [{}]
    // split - "" stringist array "Elas metasas mutionu".split("") -> ["Elas", "metsas", "mutionu"]
  };

  // otsi() {
  //     otsimiseRe.current.value
  //     Element.name.indexOf(otsimiseRef.current.value)
  // .filter(element => Element.name.indexOf(otsimiseRef.current.value) >= 0)
  // }

  return (
    // input ref=otsimiseRef onChange={otsi} [samsung]
    <div>
      {products.map((e, index) => (
        <div key={e.id + index}>
          <img className="product-image" src={e.imgSrc} alt="" />
          <div>{e.imgSrc}</div>
          <div>{e.name}</div>
          <div>{e.price}</div>
          <div>{e.id}</div>
          <button>Muuda - KODUS</button>
          <button onClick={() => deleteProduct(index)}>Kusutua toode</button>
        </div>
      ))}
    </div>
  );
}

export default MaintainProduct;