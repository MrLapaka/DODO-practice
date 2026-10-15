import styles from "./cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import type { counterItem } from "../../store/cartSlice/cartSlice";
import {
  addCountProduct,
  removeCountProduct,
  orderCreation,
  selectTotalQuantity,
} from "../../store/cartSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(selectTotalQuantity);
  const handleAddProduct = (i: counterItem) => {
    dispatch(addCountProduct(i));
  };
  const handleRemoveProduct = (i: counterItem) => {
    dispatch(removeCountProduct(i));
  };
  const handleBuyItems = () => {
    dispatch(orderCreation());
    navigate("/");
  };

  return (
    <div className={styles.mainBg}>
      <h1>Корзина{totalQuantity > 0 ? totalQuantity : ""}</h1>
      <div className={styles.dordItem}>
        {products.map((item) => {
          return (
            <div key={item.id} className={styles.product}>
              <h2>{item.name}</h2>
              <p>{item.count}</p>
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
          );
        })}
      </div>
      <div className={styles.btns}>
        {totalQuantity > 0 && (
          <button onClick={handleBuyItems}>Создать заказ</button>
        )}

        <Link to="/">
          <button>Вернуться в каталог</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
