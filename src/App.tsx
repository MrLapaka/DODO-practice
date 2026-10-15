import "./App.css";
import Cart from "./components/cart/cart";
import Catalog from "./components/catalog/catalog";
import { Routes, Route } from "react-router-dom";

export const App = () => (
  <Routes>
    <Route path="/" element={<Catalog />} />
    <Route path="/cart" element={<Cart />} />
  </Routes>
);
