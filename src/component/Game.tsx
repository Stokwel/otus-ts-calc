import React, { ChangeEvent } from "react";
import { generate } from "../fieldGenerator";
import { Field } from "./Field";

export interface GameProps {
  isLive: boolean;
  size: number;
  chanceOfLive: number;
  maxLivesPercent: number;
}

interface GameState {
  cells: boolean[][];
  isLive: boolean;
  wasApocalypse: boolean;
  numberOfLives: number;
}

export class Game extends React.Component<GameProps, GameState> {
  intervalID?: NodeJS.Timeout;
  maxLives: number;

  constructor(props: GameProps) {
    super(props);
    this.state = {
      cells: [],
      isLive: this.props.isLive,
      wasApocalypse: false,
      numberOfLives: 0,
    };

    this.maxLives =
      this.props.size * this.props.size * this.props.maxLivesPercent;

    this.live = this.live.bind(this);
    this.changeIsLive = this.changeIsLive.bind(this);
    this.startLive = this.startLive.bind(this);
    this.stopLive = this.stopLive.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      cells: generate(this.props.size, 0),
    });

    if (this.props.isLive) {
      this.startLive();
    }
  }

  componentDidUpdate(prevProps: GameProps, prevState: GameState): void {
    if (prevState.isLive !== this.state.isLive) {
      if (this.state.isLive) {
        this.startLive();
      } else {
        this.stopLive();
      }
    } else if (
      !this.state.wasApocalypse &&
      this.state.numberOfLives >= this.maxLives
    ) {
      console.info("Apocalypse");
      this.setState({
        cells: generate(this.props.size, 0),
        wasApocalypse: true,
      });
    }
  }

  componentWillUnmount(): void {
    this.stopLive();
  }

  shouldComponentUpdate(nextProps: GameProps, nextState: GameState): boolean {
    if (
      this.state.cells.length == 0 ||
      this.state.isLive !== nextState.isLive
    ) {
      return true;
    }

    for (let i = 0; i < this.props.size; i++) {
      for (let j = 0; j < this.props.size; j++) {
        if (nextState.cells[i][j] != this.state.cells[i][j]) {
          return true;
        }
      }
    }

    return false;
  }

  render(): JSX.Element {
    const { cells } = this.state;
    return (
      <div>
        <input
          type="checkbox"
          id="isLive"
          onChange={this.changeIsLive}
          checked={this.state.isLive}
        />
        <label htmlFor="isLive">Жизнь активна</label>
        <br />
        <div id="field">
          <Field
            cells={cells}
            onClick={(x, y) => {
              console.info(`${x} - ${y}`);
            }}
          />
        </div>
      </div>
    );

  }

  private startLive(): void {
    this.intervalID = setInterval(this.live, 1000);
  }

  private stopLive(): void {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  private changeIsLive(event: ChangeEvent): void {
    this.setState({ isLive: (event.target as HTMLInputElement).checked });
  }

  private live(): void {
    const x = this.getRandomInt(0, this.props.size);
    const y = this.getRandomInt(0, this.props.size);
    this.setState((currentState) => {
      const newCells = [...currentState.cells];
      newCells[x] = [...currentState.cells[x]];
      newCells[x][y] = Math.random() <= this.props.chanceOfLive;

      let numberOfLives = 0;
      for (let i = 0; i < this.props.size; i++) {
        for (let j = 0; j < this.props.size; j++) {
          numberOfLives += this.state.cells[i][j] ? 1 : 0;
        }
      }

      return {
        cells: newCells,
        numberOfLives: numberOfLives,
        wasApocalypse: false,
      };
    });
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }
}
