//------------------------------------------------- Переменные MainBoard
// Параметры доски.
export const BOARD_SIZE = { // Размер доски.
  COLUMN: 9,
  LINE: 9,
};
// Параметры клетки.
export const SQUARE_SIZE = { // Размер клетки.
  WIDTH: 50,
  HEIGHT: 50,
};
export const SQUARE_COLOR = { // Цвета клеток.
  FIRST: `rgb(234,206,166)`,
  SECOND: `rgb(134,100,61)`,
};

//------------------------------------------------- Переменные Checker
// Параметры шашки.
export const CHECKER_RADIUS = 20; // Радиус шашки.
export const CHECKER_SIZE = {
  WIDTH: 40,
  HEIGHT: 40,
};

export const CHECKERS_LINE = 3; // Сколько рядов шашек будет у каждого игрока.
export const CHECKER_COLOR = { // Цвета шашок.
  FIRST_PLAYER: `white`,
  SECOND_PLAYER: `black`,
};
export const CHECKER_POSITION = { // Изначальные кординаты шашек для обоих игроков.
  FIRST_PLAYER: {
    X: SQUARE_SIZE.WIDTH / 2,
    Y: SQUARE_SIZE.HEIGHT / 2,
  },
  SECOND_PLAYER: {
    X: SQUARE_SIZE.WIDTH / 2,
    Y: (SQUARE_SIZE.HEIGHT * BOARD_SIZE.LINE) - (SQUARE_SIZE.HEIGHT * CHECKERS_LINE) + (SQUARE_SIZE.HEIGHT / 2),
  },
};
