import {SQUARE_SIZE, CHECKER_RADIUS} from '../const';

class Checker {
  private position: {
    x: number,
    y: number,
  };
  private round: {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
  };
  private ways: Array<{
    x: number,
    y: number,
  }>;

  constructor(x: number, y: number) {
    this.position = {
      x,
      y,
    };
    this.round = {
      minX: x - CHECKER_RADIUS,
      maxX: x + CHECKER_RADIUS,
      minY: y - CHECKER_RADIUS,
      maxY: y + CHECKER_RADIUS,
    };
    this.ways = [{
      x: x + SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y - SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x + SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y + SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x - SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y + SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x - SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y - SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }];
  }

  public getPosition() { // Получаем кординаты шашки.
    return this.position;
  }

  public getWays() { // Получаем пути шашки.
    return this.ways;
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
    this.updateWays(x, y);
  }

  private updateRound(x: number, y: number): void { // Обновляет окружность шашки.
    this.round.minX = x - CHECKER_RADIUS;
    this.round.maxX = x + CHECKER_RADIUS;
    this.round.minY = y - CHECKER_RADIUS;
    this.round.maxY = y + CHECKER_RADIUS;
  }

  private updateWays(x: number, y: number): void { // Обновляет пути шашки.
    this.ways = [{
      x: x + SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y - SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x + SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y + SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x - SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y + SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }, {
      x: x - SQUARE_SIZE.WIDTH - CHECKER_RADIUS,
      y: y - SQUARE_SIZE.HEIGHT - CHECKER_RADIUS,
    }];
  }
}

export default Checker;