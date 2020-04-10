import {Tposition} from '../types';
import {CHECKERS_RADIUS} from '../const';

class Checkers {
  public svg: SVGImageElement;
  private position: Tposition;
  private round: {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
  };

  constructor(x: number, y: number, svg: SVGImageElement) {
    this.svg = svg;
    this.position = {
      x,
      y,
    };
    this.round = {
      minX: x - CHECKERS_RADIUS,
      maxX: x + CHECKERS_RADIUS,
      minY: y - CHECKERS_RADIUS,
      maxY: y + CHECKERS_RADIUS,
    };
  }

  public getPositionForRender(): Tposition { // Получаем кординаты шашки.
    return {
      x: this.position.x - CHECKERS_RADIUS,
      y: this.position.y - CHECKERS_RADIUS,
    };
  }

  public getPositionForWays(): Tposition { // Получаем кординаты шашки.
    return {
      x: this.position.x,
      y: this.position.y,
    };
  }

  public check(x: number, y: number): boolean { // Проверяет кординаты курсора попали они в шашку или нет.
    if ((this.round.minX <= x) && (x <= this.round.maxX) && (this.round.minY <= y) && (y <= this.round.maxY)) {
      return true;
    }

    return false;
  }

  public changePosition(x: number, y: number): void { // Меняет позицию шашки.
    this.position.x = x;
    this.position.y = y;

    this.updateRound(x, y);
  }

  private updateRound(x: number, y: number): void { // Обновляет окружность шашки.
    this.round.minX = x - CHECKERS_RADIUS;
    this.round.maxX = x + CHECKERS_RADIUS;
    this.round.minY = y - CHECKERS_RADIUS;
    this.round.maxY = y + CHECKERS_RADIUS;
  }
}

export default Checkers;
