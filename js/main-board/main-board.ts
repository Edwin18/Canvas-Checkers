import {
  BOARD_SIZE,
  SQUARE_SIZE,
  SQUARE_COLOR
} from '../const';

class MainBoard {
  private board: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private colorTriger: boolean;
  private cordinateX: number;
  private cordinateY: number;

  constructor() {
    this.board = document.querySelector(`#board`);
    this.ctx = this.board.getContext(`2d`);
    this.colorTriger = true; // Тригер на смену цвета клетки что бы была очередность.
    this.cordinateX = 0; // Изначальне кординаты
    this.cordinateY = 0; // Изначальне кординаты
  }

  public renderSquares(): void { // Рендер всех клеток.  
    for (let i = 0; i < BOARD_SIZE.LINE; i++) { // итерируемся по строкам
      for (let k = 0; k < BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
        this.renderSquare();
        this.cordinateX = this.cordinateX + SQUARE_SIZE.WIDTH; // двигаемся по строке вправо
      }
      this.cordinateY = this.cordinateY + SQUARE_SIZE.HEIGHT; // переходим на следующую строку
      this.cordinateX = 0; // начинаем с начала строки
    }

    this.colorTriger = true;
  }

  private renderSquare(): void { // Рендер клетки.
    if (this.colorTriger) {
      this.ctx.fillStyle = SQUARE_COLOR.FIRST; // указываем цвет
      this.ctx.fillRect(this.cordinateX, this.cordinateY, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

      this.colorTriger = false; // снова таки тригер цвета.
    } else {
      this.ctx.fillStyle = SQUARE_COLOR.SECOND; // указываем цвет
      this.ctx.fillRect(this.cordinateX, this.cordinateY, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

      this.colorTriger = true; // снова таки тригер цвета.
    }
  }
}

export default MainBoard;  