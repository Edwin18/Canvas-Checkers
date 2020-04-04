// Холст доски.
const canvasBoard: HTMLCanvasElement = document.querySelector(`#board`);
const ctxB: CanvasRenderingContext2D = canvasBoard.getContext(`2d`);
// Холст шашек.
const canvasCheckers: HTMLCanvasElement = document.querySelector(`#checkers`);
const ctxC: CanvasRenderingContext2D = canvasCheckers.getContext(`2d`);

// Изначальные параметры:
//------------------------------------------------- Переменные <-ctxB->
// Параметры доски.
const BOARD_SIZE = { // Размер доски.
  COLUMN: 9,
  LINE: 9,
};
// Параметры клетки.
const SQUARE_SIZE = { // Размер клетки.
  WIDTH: 50,
  HEIGHT: 50,
};
const SQUARE_COLOR = { // Цвета клеток.
  FIRST: `rgb(234,206,166)`,
  SECOND: `rgb(134,100,61)`,
};

//------------------------------------------------- Переменные <-ctxC->
// Параметры шашки.
const CHECKERS_LINE = 3; // Сколько рядов шашек будет у каждого игрока.
const CHECKER_SIZE = { // Размеры шашки.
  RADIUS: 20,
}
const CHECKER_COLOR = { // Цвета шашок.
  FIRST_PLAYER: `white`,
  SECOND_PLAYER: `black`,
};
const CHECKER_POSITION = { // Изначальные кординаты шашек для обоих игроков.
  FIRST_PLAYER: {
    X: SQUARE_SIZE.WIDTH / 2,
    Y: SQUARE_SIZE.HEIGHT / 2,
  },
  SECOND_PLAYER: {
    X: SQUARE_SIZE.WIDTH / 2,
    Y: (SQUARE_SIZE.HEIGHT * BOARD_SIZE.LINE) - (SQUARE_SIZE.HEIGHT * CHECKERS_LINE) + (SQUARE_SIZE.HEIGHT / 2),
  },
};
const OBJECTS = { // Список всех объектов для отрисовки
  CHECKERS: [], // Список всех шашек
  SELECTED: null,
};

//------------------------------------------------- Логика <-ctxB->
// Рабочие переменные:
let colorTriger: boolean = true; // Тригер на смену цвета клетки что бы была очередность.

const renderSquare = (x, y): void => { // Рендер клетки.
  if (colorTriger) {
    ctxB.fillStyle = SQUARE_COLOR.FIRST; // указываем цвет
    ctxB.fillRect (x, y, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

    colorTriger = false; // снова таки тригер цвета.
  } else {
    ctxB.fillStyle = SQUARE_COLOR.SECOND; // указываем цвет
    ctxB.fillRect (x, y, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

    colorTriger = true; // снова таки тригер цвета.
  }
};

/**
 * Рендерит все клетки на холсте.
 * @function
 */
const renderSquares = (): void => { // Рендер всех клеток.
  let cordinateX = 0;
  let cordinateY = 0;

  for (let i = 0; i < BOARD_SIZE.LINE; i++) { // итерируемся по строкам
    for (let k = 0; k < BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
      renderSquare(cordinateX, cordinateY);
      cordinateX = cordinateX + SQUARE_SIZE.WIDTH; // двигаемся по строке вправо
    }
    cordinateY = cordinateY + SQUARE_SIZE.HEIGHT; // переходим на следующую строку
    cordinateX = 0; // начинаем с начала строки
  }
  
  colorTriger = true;
};

//------------------------------------------------- Логика <-ctxC->
const getChecker = (x, y) => (
  {
    position: {
      x,
      y,
    },
    round: { // Описывает окружность шашки, для того что бы определять попал курсор в шашку или нет.
      minX: x - CHECKER_SIZE.RADIUS,
      maxX: x + CHECKER_SIZE.RADIUS,
      minY: y - CHECKER_SIZE.RADIUS,
      maxY: y + CHECKER_SIZE.RADIUS,
    },
    ways: [ // Возможные ходы для шашки
      // x: текущее положение курсора относительно оси Х
      // SQUARE_SIZE: размер клетки. Нужен для смещения на следующие клетки
      // CHECKER_SIZE.RADIUS радиус шашки. Нужен для смещения шашки в центр
      {
        x: x + SQUARE_SIZE.WIDTH - CHECKER_SIZE.RADIUS,
        y: y - SQUARE_SIZE.HEIGHT - CHECKER_SIZE.RADIUS,
      },
      {
        x: x + SQUARE_SIZE.WIDTH - CHECKER_SIZE.RADIUS,
        y: y + SQUARE_SIZE.HEIGHT - CHECKER_SIZE.RADIUS,
      },
      {
        x: x - SQUARE_SIZE.WIDTH - CHECKER_SIZE.RADIUS,
        y: y + SQUARE_SIZE.HEIGHT - CHECKER_SIZE.RADIUS,
      },
      {
        x: x - SQUARE_SIZE.WIDTH - CHECKER_SIZE.RADIUS,
        y: y - SQUARE_SIZE.HEIGHT - CHECKER_SIZE.RADIUS,
      },
    ],
  }
);

const getCheckers = (startX, startY) => {
  let cordinateX = startX;
  let cordinateY = startY;
  let stepColumn = true; // шаг по столбцу, что бы шашки были через одну
  let stepLine = false; // шаг строк, что бы шашки были через одну)
  
  for (let i = 1; i <= CHECKERS_LINE; i++) { // итерируемся по строкам
    for (let k = 1; k <= BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
      if (stepColumn) { // если true рендерим шашку, если false пропускаем клетку
        if (stepLine) { // если true начинаем рендерить шашки с 1-й клетки, если flase переходим к 2-й клетке
          cordinateX = startX; // задаем кординаты 1-й клетки
          stepLine = false; // задаем false что бы не зациклить рендер на 1-й клетке
        } else {
          cordinateX = cordinateX + SQUARE_SIZE.WIDTH; // переходим к 2-й клетке 
        }
        OBJECTS.CHECKERS.push(               
          getChecker(cordinateX, cordinateY) // пушим наши шашки в массив всех объектов
        );
    
        stepColumn = false; // задаем false что бы пропустить 1 клетку
      } else {
        cordinateX = cordinateX + SQUARE_SIZE.WIDTH; // пропускаем клетку
        stepColumn = true; // задаем true что бы не пропустить клетку
      }
    }

    stepLine = i % 2 === 0 ? false : true; // вычесляем четность строки, если нечетное то рендер будет с 2-й клетки, если четное то с 1-й
    stepColumn = true; // задаем true, так как переходим на новую строку и нужно обнулить логику вычеслений клеток
    cordinateX = startX; // задаем кординаты 1-й клетки
    cordinateY = cordinateY + SQUARE_SIZE.HEIGHT; // переходим на следующую строку
  }
};

//------------------------------------------------- Вспомогательные функции.
/**
 * Преобразовывает кординаты миши относительно canvas.
 * @function
 * @param {HTMLCanvasElement} canvas - Элемент канваса.
 * @param {number} x - Кординаты миши относительно window.
 * @param {number} y - Кординаты миши относительно window.
 * @return {Object}
 */
const windowToCanvas = (canvas: HTMLCanvasElement, x: number, y: number) => {
  const bbox = canvas.getBoundingClientRect();
  return { 
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height),
  };
};

//------------------------------------------------- Логика <-ctxB-ctxC>
const renderBoard = (x = 50, y = 50) => { // Рендер всей доски.
  renderSquares(); // рендер клеток

  // ТЕСТ
  OBJECTS.CHECKERS = []; // удаляем все точки
  getCheckers(CHECKER_POSITION.FIRST_PLAYER.X, CHECKER_POSITION.FIRST_PLAYER.Y); // получаем новые кординаты
  OBJECTS.CHECKERS.forEach((checker) => (
    ctxB.drawImage(img, checker.position.x - 20, checker.position.y - 20, 40, 40)
  ));
  

  

  ctxB.drawImage(img, x - 20, y - 20, 40, 40);
  console.log(OBJECTS);
};

// ТЕСТ
const img: SVGImageElement = document.querySelector(`#source`);

document.addEventListener(`mousedown`, (evt) => {
  const cor = windowToCanvas(canvasBoard, evt.clientX, evt.clientY);

  // if (OBJECTS.SELECTED) {
  //   OBJECTS.SELECTED = null;
  // } else {
  //   OBJECTS.SELECTED = OBJECTS.CHECKERS.find(({round}) => (round.minX <= cor.x) && (cor.x <= round.maxX) && (round.minY <= cor.y) && (cor.y <= round.maxY));
  // }
  OBJECTS.SELECTED = OBJECTS.CHECKERS.find(({round}) => (round.minX <= cor.x) && (cor.x <= round.maxX) && (round.minY <= cor.y) && (cor.y <= round.maxY));
  OBJECTS.SELECTED.ways.forEach((way) => (
    ctxB.drawImage(img, way.x, way.y, 40, 40)
  ));

  console.log(OBJECTS.SELECTED);
});

// canvasBoard.addEventListener('mousedown', (evt) => {
//   evt.preventDefault();
//   const cor = windowToCanvas(canvasBoard, evt.clientX, evt.clientY);
//   const res = OBJECTS.CHECKERS.find(({round}) => (round.minX <= cor.x) && (cor.x <= round.maxX) && (round.minY <= cor.y) && (cor.y <= round.maxY));

//   const oneMouseMove = (moveEvt) => {
//     moveEvt.preventDefault();


//   };

//   const oneMouseUp = (upEvt) => {
//     upEvt.preventDefault();

//     document.removeEventListener('mousemove', oneMouseMove);
//     document.removeEventListener('mouseup', oneMouseUp);
//   };

//   document.addEventListener('mousemove', oneMouseMove);
//   document.addEventListener('mouseup', oneMouseUp);
// });


const init = (): void => {
  renderSquares();
};

init();