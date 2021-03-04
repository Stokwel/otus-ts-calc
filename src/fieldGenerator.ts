export function generate(dimension: number): boolean[][] {
  const field: boolean[][] = [];
  for (let i = 0; i < dimension; i++) {
    field[i] = [];
    for (let j = 0; j < dimension; j++) {
      field[i][j] = Math.random() < 0.5;
    }
  }

  return field;
}
