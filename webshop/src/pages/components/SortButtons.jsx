import { useTranslation } from "react-i18next";

function SortButtons(props) {
  const { t } = useTranslation();

  const sortAZ = () => {
    props.products.sort((a, b) => a.name.localeCompare(b.name));
    props.updateProducts(props.products.slice());
  };
  const sortZA = () => {
    props.products.sort((a, b) => b.name.localeCompare(a.name));
    props.updateProducts(props.products.slice());
  };
  const sortPriceAsc = () => {
    props.products.sort((a, b) => a.price - b.price);
    props.updateProducts(props.products.slice());
  };
  const sortPriceDesc = () => {
    props.products.sort((a, b) => b.price - a.price);
    props.updateProducts(props.products.slice());
  };

  return (
    <div>
      <button onClick={sortAZ}>{t("home.sortaz")}</button>
      <button onClick={sortZA}>{t("home.sortaz")}</button>
      <button onClick={sortPriceAsc}>{t("home.sort-price-asc")}</button>
      <button onClick={sortPriceDesc}>{t("home.sort-price-desc")}</button>
    </div>
  );
}

export default SortButtons;
