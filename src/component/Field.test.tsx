import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {Field} from './Field';
import {generate} from "../fieldGenerator";

afterEach(cleanup);

it('Field is rendered', () => {
  console.info = jest.fn();

  const {container} = render(
    <Field
      cells={generate(5)}
      onClick={(x, y) => {
        console.info(`${x} - ${y}`);
      }}
    />,
  );

  expect(container.querySelectorAll('button').length).toBe(25);
  expect(container.querySelectorAll('br').length).toBe(4);

  fireEvent.click(container.querySelectorAll('button')[4]);
  expect(console.info).toHaveBeenCalledWith('0 - 4')
});
