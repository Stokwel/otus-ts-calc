import React from "react";
import ReactDOM from "react-dom";
import { Game } from "./component/Game";

ReactDOM.render(
  <React.StrictMode>
    <Game size={5} isLive={true} />
  </React.StrictMode>,
  document.getElementById("root")
);
