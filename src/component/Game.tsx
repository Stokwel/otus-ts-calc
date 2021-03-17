import React from "react";
import { generate } from "../fieldGenerator";
import { Field } from "./Field";

export interface FieldProps {
  cells: boolean[][];
  onClick: (x: number, y: number) => void;
}

interface GameProps {
  isLive: boolean;
  size: number;
}

interface GameState {
  cells: boolean[][];
  isLive: boolean;
}

export class Game extends React.Component<GameProps, GameState> {
  intervalID?: number;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      cells: [],
      isLive: this.props.isLive,
    };
    this.live = this.live.bind(this);
  }

  componentDidMount() {
    this.setState({
      cells: generate(this.props.size),
    });

    if (this.props.isLive) {
      this.intervalID = setInterval(this.live, 1000);
    }
  }

  componentWillUnmount() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  shouldComponentUpdate(nextProps: GameProps, nextState: GameState) {
    if (this.state.cells.length == 0) {
      return true;
    }

    for (let i = 0; i < this.props.size; i++) {
      for (let j = 0; j < this.props.size; j++) {
        console.info(nextState.cells[i][j], this.state.cells[i][j]);
        if (nextState.cells[i][j] != this.state.cells[i][j]) {
          console.info("RERENDER!");
          return true;
        }
      }
    }

    return false;
  }

  render() {
    const { cells } = this.state;
    return (
      <Field
        cells={cells}
        onClick={(x, y) => {
          console.info(`${x} - ${y}`);
        }}
      />
    );
  }

  private live(): void {
    const isLive = Math.random() >= 0.5;
    const x = this.getRandomInt(0, this.props.size);
    const y = this.getRandomInt(0, this.props.size);
    const newCells = this.state.cells;

    newCells[x][y] = isLive;
    this.setState({
      cells: newCells,
    });
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
