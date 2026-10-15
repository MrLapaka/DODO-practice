import pizza_menu from "../../massiv/massiv";
import { useDispatch, useSelector } from "react-redux";
import styles from "./catalog.module.scss";
import type { RootState } from "../../store/store";
import type { counterItem } from "../../store/cartSlice/cartSlice";
import {
  addCountProduct,
  removeCountProduct,
  selectTotalQuantity,
} from "../../store/cartSlice/cartSlice";
import { Link } from "react-router-dom";
const Catalog = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(selectTotalQuantity);

  const handleAddProduct = (i: counterItem) => {
    dispatch(addCountProduct(i));
  };
  const handleRemoveProduct = (i: counterItem) => {
    dispatch(removeCountProduct(i));
  };

  return (
    <div className={styles.mainBg}>
      <Link to="/cart">
        <h1>Корзина {totalQuantity > 0 ? totalQuantity : ""}</h1>
      </Link>
      <div className={styles.catalogGrid}>
        {pizza_menu.map((item) => {
          const searchProduct = products.find((p) => p.id === item.id);
          const count = searchProduct ? searchProduct.count : 0;
          return (
            <div className={styles.pizzaCard} key={item.id}>
              <img className={styles.pizzaImg} src={item.img} alt="" />
              <h1 className={styles.pizzaName}>{item.name}</h1>
              {count == 0 ? (
                <button
                  onClick={() => handleAddProduct(item)}
                  className={styles.pizzaBtn}
                >
                  Добавить в корзину
                </button>
              ) : (
                <div className={styles.counter}>
                  <div>
                    <button
                      onClick={() => handleRemoveProduct(item)}
                      className={styles.pizzaBtn}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleAddProduct(item)}
                      className={styles.pizzaBtn}
                    >
                      +
                    </button>
                  </div>
                  <button className={styles.countBtn}>{count}</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
