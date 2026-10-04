import React from "react";
import pizza_menu from "../../massiv/massiv";
import { useDispatch } from "react-redux";
import styles from "./catalog.module.scss";
const Catalog = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.mainBg}>
      <div className={styles.catalogGrid}>
        {pizza_menu.map((item) => (
          <div className={styles.pizzaCard} key={item.id}>
            <img className={styles.pizzaImg} src={item.img} alt="" />
            <h1 className={styles.pizzaName}>{item.name}</h1>
            <button className={styles.pizzaBtn}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
