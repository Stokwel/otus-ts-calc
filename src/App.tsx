import {generate} from "./fieldGenerator";
import {Field} from "./component/Field";
import React from "react";

function App() {
  return (
      <Field cells={generate(5)} />
  );
}

export default App;
