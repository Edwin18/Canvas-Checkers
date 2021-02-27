import {
  BOARD_SIZE,
  SQUARE_SIZE,
  SQUARE_COLOR
} from '../const';

class MainBoard {
  private board: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private colorTrigger: boolean;
  private coordinateX: number;
  private coordinateY: number;

  constructor() {
    this.board = document.querySelector(`#board`);
    this.ctx = this.board.getContext(`2d`);
    this.colorTrigger = true; // Тригер на смену цвета клетки что бы была очередность.
    this.coordinateX = 0; // Изначальне кординаты
    this.coordinateY = 0; // Изначальне кординаты
  }

  public render(): void { // Рендер всех клеток.
    for (let i = 0; i < BOARD_SIZE.LINE; i++) { // итерируемся по строкам
      for (let k = 0; k < BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
        this.renderSquare();
        this.coordinateX = this.coordinateX + SQUARE_SIZE.WIDTH; // двигаемся по строке вправо
      }
      this.coordinateY = this.coordinateY + SQUARE_SIZE.HEIGHT; // переходим на следующую строку
      this.coordinateX = 0; // начинаем с начала строки
    }

    this.colorTrigger = true;
  }

  private renderSquare(): void { // Рендер клетки.
    if (this.colorTrigger) {
      this.ctx.fillStyle = SQUARE_COLOR.FIRST; // указываем цвет
      this.ctx.fillRect(this.coordinateX, this.coordinateY, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

      this.colorTrigger = false; // снова таки тригер цвета.
    } else {
      this.ctx.fillStyle = SQUARE_COLOR.SECOND; // указываем цвет
      this.ctx.fillRect(this.coordinateX, this.coordinateY, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT); // заливаем выбранную область

      this.colorTrigger = true; // снова таки тригер цвета.
    }
  }
}

export default MainBoard;
