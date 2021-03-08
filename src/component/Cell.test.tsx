import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {Cell} from './Cell';
import '@testing-library/jest-dom'

afterEach(cleanup);

describe("Cell is rendered", () => {
  test.each([
    [true, 'black'],
    [false, 'white']
  ])('isFilled: %s', (isFilled, expected) => {
    console.info = jest.fn();

    const {container} = render(
      <Cell
        onClick={(x, y) => {
          console.info(`${x} - ${y}`);
        }}
        isFilled={isFilled}
        x={3}
        y={5}
      />,
    );

    expect(container.children.length).toBe(1);

    const button = container.querySelector('button');
    expect(button).not.toBeNull();

    expect(button).toHaveStyle(`background-color: ${expected}`);

    fireEvent.click(button);
    expect(console.info).toHaveBeenCalledWith('3 - 5')
  });
});
