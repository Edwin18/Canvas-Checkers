import Checkers from '../checkers/checkers';
import Ways from '../ways/ways';
import {TWays} from '../types';
import {
  BOARD_SIZE,
  SQUARE_SIZE,
  CHECKERSS_LINE,
  CHECKERS_POSITION,
  CHECKERS_SIZE,
} from '../const';
import {windowToCanvas} from '../utils';

class CheckersBoard {
  private board: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private firstPlayer: Array<Checkers>;
  private secondPlayer: Array<Checkers>;
  private firstPlayerSvg: SVGImageElement;
  private secondPlayerSvg: SVGImageElement;
  private ways: Array<TWays>|null;
  private allChacker: Array<Checkers>

  constructor() {
    this.board = document.querySelector(`#checkers`);
    this.ctx = this.board.getContext(`2d`);

    this.firstPlayerSvg = document.querySelector(`#first`);
    this.secondPlayerSvg = document.querySelector(`#second`);

    this.firstPlayer = this.generateFirstPlayer();
    this.secondPlayer = this.generateSecondPlayer();
    this.allChacker = [...this.firstPlayer, ...this.secondPlayer];
    this.ways = null;
  }

  public render(): void {
    this.clear();
    this.renderCheckers();
    this.renderWays();
  }

  public checkersBoardClickHandler() {
    this.board.addEventListener(`click`, (evt) => {
      const cords = windowToCanvas(this.board, evt.clientX, evt.clientY);
      const target = this.checkClick(cords.x, cords.y);

      if (target) {
        const ways = new Ways(target, this.firstPlayer, this.secondPlayer);
        this.ways = ways.getWays();
      } else {
        this.ways = null;
      }

      this.render();
    });
  }

  private checkClick(x: number, y: number): Checkers {
    return this.allChacker.find((checkers) => (checkers.check(x, y)));
  }

  private renderCheckers(): void {
    this.allChacker.forEach((checkers) => {
      const cords = checkers.getPositionForRender();
      this.ctx.drawImage(checkers.svg, cords.x, cords.y, CHECKERS_SIZE.WIDTH, CHECKERS_SIZE.HEIGHT);
    });
  }

  private renderWays() {
    if (this.ways) {
      this.ways.forEach((way) => {
        this.ctx.drawImage(way.svg, way.x, way.y, SQUARE_SIZE.WIDTH, SQUARE_SIZE.HEIGHT);
      });
    }
  }

  private generateFirstPlayer(): Array<Checkers> {
    return this.generatePlayer(CHECKERS_POSITION.FIRST_PLAYER.X, CHECKERS_POSITION.FIRST_PLAYER.Y, this.firstPlayerSvg);
  }

  private generateSecondPlayer(): Array<Checkers> {
    return this.generatePlayer(CHECKERS_POSITION.SECOND_PLAYER.X, CHECKERS_POSITION.SECOND_PLAYER.Y, this.secondPlayerSvg);
  }

  private generatePlayer(startX: number, startY: number, svg: SVGImageElement): Array<Checkers> {
    let cordinateX = startX;
    let cordinateY = startY;
    let stepColumn = true; // шаг по столбцу, что бы шашки были через одну
    let stepLine = false; // шаг строк, что бы шашки были через одну)
    const player = [];

    for (let i = 1; i <= CHECKERSS_LINE; i++) { // итерируемся по строкам
      for (let k = 1; k <= BOARD_SIZE.COLUMN; k++) { // итерируемся по столбцам
        if (stepColumn) { // если true рендерим шашку, если false пропускаем клетку
          if (stepLine) { // если true начинаем рендерить шашки с 1-й клетки, если flase переходим к 2-й клетке
            cordinateX = startX; // задаем кординаты 1-й клетки
            stepLine = false; // задаем false что бы не зациклить рендер на 1-й клетке
          } else {
            cordinateX = cordinateX + SQUARE_SIZE.WIDTH; // переходим к 2-й клетке
          }
          player.push(
            new Checkers(cordinateX, cordinateY, svg) // Создаем экземпляр класса Checkers и пушим в массив
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

  private clear() {
    this.ctx.clearRect(0, 0, SQUARE_SIZE.WIDTH * BOARD_SIZE.COLUMN, SQUARE_SIZE.HEIGHT * BOARD_SIZE.LINE);
  }
}

export default CheckersBoard;
