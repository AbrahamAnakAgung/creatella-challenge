import * as React from "react";
import { hot } from "react-hot-loader/root";
import "./App.css";
import ImageList from "./components/ImageList/ImageList";

function App() {
  return (
    <div>
      <ImageList />
    </div>
  );
}

export default hot(App);
