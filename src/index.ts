import { createInterface } from "readline";

import * as core from "./core";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isPoland = '--poland' === process.argv[2];

const recursiveAsyncReadLine = function () {
  rl.question("Command: ", function (answer) {
    if (answer == "q") {
      return rl.close();
    }

    try {
      const result = isPoland ? core.runCalculatePoland(answer) : core.runCalculate(answer);
      console.log(`Result: ${result}`);
    } catch (e) {
      console.log("Wrong string, try again!");
    }

    recursiveAsyncReadLine();
  });
};

recursiveAsyncReadLine();
