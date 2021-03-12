import { generate } from "./fieldGenerator";
import { Field } from "./component/Field";
import React from "react";

function App(): JSX.Element {
  return (
    <Field




      cells={generate(5)}
              onClick={(x, y) => {
              console.info(`${x} - ${y}`);
      }}
    />
  );
}

export default App;
