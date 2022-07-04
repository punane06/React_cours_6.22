import { useEffect, useRef, useState } from "react";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const categoriesDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  // Kui lisate andmebaasi, siis l'heb home.jsx.s v]tmine kantki, sest kuju [{},{}] ---> {-asda: {}, -eqw{}}
  const [products, setProducts] = useState([]);
  const productDbUrl =
    "https://react-june-webshop-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(categoriesDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setCategories(newArray);
      });
    fetch(productDbUrl)
      .then((res) => res.json())
      .then((data) => {
        const newArray = [];
        for (const key in data) {
          newArray.push(data[key]);
        }
        setProducts(newArray);
      });
    // const categoriesFromDb = fetchFromDb(categoriesDbUrl);
    // setProducts(categoriesFromDb);
    // const productsFromDb = fetchFromDb(productDbUrl);
    // setProducts(productsFromDb);
  }, []);

  // const fetchFromDb = (url) => {
  //   let itemsFromDb = [];
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const newArray = [];
  //       for (const key in data) {
  //         newArray.push(data[key]);
  //       }
  //       itemsFromDb = newArray;
  //     });
  //   return itemsFromDb;
  // };

  const addNewProduct = () => {
    // console.log("Funktsioon works");
    // console.log("Ref value " + nameRef.current.value);
    if (nameRef.current.value === "") {
      setMessage("No selected product");
    } else {
      setMessage("Successfully added " + nameRef.current.value);
      const newProduct = {
        id: Number(idRef.current.value),
        name: nameRef.current.value,
        price: Number(priceRef.current.value),
        active: isActiveRef.current.checked,
        category: categoryRef.current.value,
        description: descriptionRef.current.value,
        imgSrc: imgSrcRef.current.value,
      };
      fetch(productDbUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
        header: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  // kui toode ei ole unukaanle:
  //  - anna sonum "ID on  mitteunikaalne!"
  // - pane nupule peale "disabled" - nuppu ei saa klikkida

  // kui toote ID in unikaalne
  // - kustuta s]num - ''
  // -vota nupult "disable" maha

  const chcekIdUniquess = () => {
    if (idRef.current.value.length === 8) {
      // const index = products.findIndex((e) => {
      //   // console.log(typeof e.id);
      //   // console.log(typeof idRef.current.value);
      //   return Number(e.id) === Number(idRef.current.value);
      // }); - sama mis alumine, siis kui mitu rida vaja panna, siis vaja loogeliste sulgudega
      const index = products.findIndex(
        (e) => Number(e.id) === Number(idRef.current.value)
      );
      if (index >= 0) {
        // console.log("ei ole unikaalne");
        setMessage("ID on mitteuinikaalne");
        setButtonDisabled(true);
      } else {
        // console.log("On  unikaalne");
        setMessage("");
        setButtonDisabled(false);
      }
    }
  };

  return (
    <div>
      <br />
      <label>Product ID</label>
      <br />
      <input ref={idRef} onChange={() => chcekIdUniquess()} type="number" />
      <br />
      <label>Product name</label>
      <br />
      <input ref={nameRef} type="text" />
      <br />
      <label>Product price</label>
      <br />
      <input ref={priceRef} type="number" />
      <br />
      <label>Product description</label>
      <br />
      <input ref={descriptionRef} type="text" />
      <br />
      <label>Product category</label>
      <br />
      {/* <input ref={categoryRef} type="text" /> */}
      <select ref={categoryRef}>
        <option selected disabled>
          Pick category
        </option>
        {categories.map((e) => (
          <option>{e.name}</option>
        ))}
      </select>
      <br />
      <label>Product image</label>
      <br />
      <input ref={imgSrcRef} type="text" />
      <br />

      <label>Product active</label>
      <br />
      <input ref={isActiveRef} type="checkbox" />
      <br />
      <button disabled={buttonDisabled} onClick={addNewProduct}>
        Add
      </button>
      <div>{message}</div>
    </div>
  );
}

export default AddProduct;
