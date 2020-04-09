import Checker from '../checker/checker';
import {
  BOARD_SIZE,
  SQUARE_SIZE,
  CHECKERS_LINE,
  CHECKER_POSITION,
  CHECKER_SIZE,
} from '../const';
import {windowToCanvas} from '../utils';

class CheckersBoard {
  private board: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private firstPlayer: Array<Checker>;
  private secondPlayer: Array<Checker>;
  private firstPlayerSvg: SVGImageElement;
  private secondPlayerSvg: SVGImageElement;

  constructor() {
    this.board = document.querySelector(`#checkers`);
    this.ctx = this.board.getContext(`2d`);

    this.firstPlayerSvg = document.querySelector(`#first`);
    this.secondPlayerSvg = document.querySelector(`#second`);

    this.firstPlayer = this.generateFirstPlayer();
    this.secondPlayer = this.generateSecondPlayer();
  }

  public render(): void {
    this.renderFirstPlayer();
    this.renderSecondPlayer();
  }

  public checkersBoardClickHandler() {
    this.board.addEventListener(`click`, (evt) => {
      const cords = windowToCanvas(this.board, evt.clientX, evt.clientY);
      console.log(cords);
    });
  }

  private renderFirstPlayer(): void {
    this.firstPlayer.forEach((checker) => {
      const cords = checker.getPosition();
      this.ctx.drawImage(this.firstPlayerSvg, cords.x, cords.y, CHECKER_SIZE.WIDTH, CHECKER_SIZE.HEIGHT);
    });
  }

  private renderSecondPlayer(): void {
    this.secondPlayer.forEach((checker) => {
      const cords = checker.getPosition();
      this.ctx.drawImage(this.secondPlayerSvg, cords.x, cords.y, CHECKER_SIZE.WIDTH, CHECKER_SIZE.HEIGHT);
    });
  }

  private generateFirstPlayer(): Array<Checker> {
    return this.generatePlayer(CHECKER_POSITION.FIRST_PLAYER.X, CHECKER_POSITION.FIRST_PLAYER.Y);
  }

  private generateSecondPlayer(): Array<Checker> {
    return this.generatePlayer(CHECKER_POSITION.SECOND_PLAYER.X, CHECKER_POSITION.SECOND_PLAYER.Y);
  }

  private generatePlayer(startX: number, startY: number): Array<Checker> {
    let cordinateX = startX;
    let cordinateY = startY;
    let stepColumn = true; // шаг по столбцу, что бы шашки были через одну
    let stepLine = false; // шаг строк, что бы шашки были через одну)
    const player = [];

    for (let i = 1; i <= CHECKERS_LINE; i++) { // итерируемся по строкам
      for (let k = 1; k <= BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
        if (stepColumn) { // если true рендерим шашку, если false пропускаем клетку
          if (stepLine) { // если true начинаем рендерить шашки с 1-й клетки, если flase переходим к 2-й клетке
            cordinateX = startX; // задаем кординаты 1-й клетки
            stepLine = false; // задаем false что бы не зациклить рендер на 1-й клетке
          } else {
            cordinateX = cordinateX + SQUARE_SIZE.WIDTH; // переходим к 2-й клетке
          }
          player.push(
            new Checker(cordinateX, cordinateY) // Создаем экземпляр класса Checker и пушим в массив
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

    return player;
  }
}

export default CheckersBoard;
