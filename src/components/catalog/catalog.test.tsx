import { expect, test } from "vitest";
import { orderCreation } from "../../store/cartSlice/cartSlice";

import cartReducer, {
  addCountProduct,
  removeCountProduct,
  selectTotalQuantity,
  type counterItem,
} from "../../store/cartSlice/cartSlice";

test("увеличение количества товара на 1", () => {
  const testPizza: counterItem = { id: 1, name: "пепе", count: 1 };

  const initialState = { items: [testPizza] };

  const result = cartReducer(initialState, addCountProduct(testPizza));

  expect(result.items[0].count).toBe(2);
});

test("добавление 1 товара", () => {
  const testPizza: counterItem = { id: 1, name: "пепе", count: 1 };

  const initialState = { items: [] };

  const result = cartReducer(initialState, addCountProduct(testPizza));

  expect(result.items[0]).toEqual(testPizza);
});

test("уменьшение количества товара на 1", () => {
  const testPizza: counterItem = { id: 1, name: "маргарита", count: 2 };

  const initialState = {
    items: [testPizza],
  };

  const result = cartReducer(initialState, removeCountProduct(testPizza));

  expect(result.items[0].count).toBe(1);
});

test("удаление товара", () => {
  const testPizza: counterItem = { id: 1, name: "маргарита", count: 1 };

  const initialState = {
    items: [testPizza],
  };

  const result = cartReducer(initialState, removeCountProduct(testPizza));

  expect(result.items).toEqual([]);
});
test("создание заказа", () => {
  const testPizza: counterItem[] = [
    { id: 1, name: "маргарита", count: 1 },
    { id: 2, name: "маргарита", count: 1 },
  ];

  const initialState = {
    items: testPizza,
  };

  const result = cartReducer(initialState, orderCreation());

  expect(result.items).toEqual([]);
});

test("сумма счетчиков", () => {
  const state = {
    cart: {
      items: [
        { id: 1, name: "маргарита", count: 1 },
        { id: 2, name: "маргарита", count: 2 },
        { id: 3, name: "маргарита", count: 6 },
      ],
    },
  };

  expect(selectTotalQuantity(state)).toBe(9);
});
