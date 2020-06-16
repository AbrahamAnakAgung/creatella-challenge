import * as React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <div>
      <ProductList />
    </div>
  );
}

export default hot(App);
