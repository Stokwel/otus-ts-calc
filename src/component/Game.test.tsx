import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Game } from "./Game";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("Game is rendered", () => {
  test.each([
    [false, 5, false, 25, 4],
    [true, 3, true, 9, 2],
  ])(
    "%s",
    (
      isLive,
      size,
      expectedIsChecked,
      expectedCountButtons,
      expectedCountBr
    ) => {
      const { container } = render(
        <Game
          isLive={isLive}
          size={size}
          maxLivesPercent={0}
          chanceOfLive={0}
        />
      );

      const isCheckedQuery = expectedIsChecked ? ":checked" : ":not(:checked)";
      expect(
        container.querySelectorAll(`input[type='checkbox']${isCheckedQuery}`)
          .length
      ).toBe(1);
      const buttons = container.querySelectorAll("#field button");
      expect(buttons.length).toBe(expectedCountButtons);
      Array.from(buttons).forEach((button) =>
        expect(button).toHaveStyle(`background-color: white`)
      );
      expect(container.querySelectorAll("#field br").length).toBe(
        expectedCountBr
      );
    }
  );
});
