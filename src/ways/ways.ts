import Checkers from "../checkers/checkers";
import {TWays, TPosition} from '../types';
import {SQUARE_SIZE} from "../const";

// Оперделять я буду с помощь метода find() и если он даст тру тогда это текущий массив, если фолс значит другой, что бы не делать 2 проверки.
// Определить к чьей команде относистя checkers, потом пропустить все пути через свою команду что бы отсеить вообще существующие пути
// потом оставшиеся пути через команду противника что бы понять есть ли боевые ходы

class Ways {
  private team: Array<Checkers>;
  private wayClear: SVGImageElement;
  private wayAttack: SVGImageElement;
  private currentCord: TPosition;
  private ways: Array<TWays>;

  constructor(
    private checkers: Checkers,
    private firstPlayer: Array<Checkers>,
    private secondPlayer: Array<Checkers>,
  ) {
    this.team = this.getTeam();

    this.wayClear = document.querySelector(`#way-clear`);
    this.wayAttack = document.querySelector(`#way-attack`);

    this.currentCord = this.checkers.geTPositionForWays();

    this.ways = []; // пушить сюда объекты путей

    this.generateWays();
  }

  public getWays(): Array<TWays> {
    return this.ways.map((way) => ({
      svg: way.svg,
      x: way.x - SQUARE_SIZE.WIDTH / 2,
      y: way.y - SQUARE_SIZE.HEIGHT / 2,
      round: {
        minX: way.round.minX,
        maxX: way.round.maxX,
        minY: way.round.minY,
        maxY: way.round.maxY,
      },
    }));
  }

  private generateWays(): void {
    this.checkWayClear();
  }

  private getTeam(): Array<Checkers> {
    const team = this.firstPlayer.includes(this.checkers);

    if (team) {
      return this.firstPlayer;
    }

    return this.secondPlayer;
  }

  private checkWayClear(): void {
    const ways = [this.generateWayNE(), this.generateWaySE(), this.generateWaySW(), this.generateWayNW()];
    ways.forEach((way, i) => {
      const result = this.team.find((checkers) => checkers.geTPositionForWays().x === way.x && checkers.geTPositionForWays().y === way.y);

      if (!result) {
        this.ways.push({
          svg: this.wayClear,
          x: way.x,
          y: way.y,
          round: {
            minX: way.x - SQUARE_SIZE.WIDTH / 2,
            maxX: way.x + SQUARE_SIZE.WIDTH / 2,
            minY: way.y - SQUARE_SIZE.HEIGHT / 2,
            maxY: way.y + SQUARE_SIZE.HEIGHT / 2,
          },
        });
      }
    });
  }

  private checkWayAttack() {
    // Сделать когда начнут ходить шашки!!!
  }

  private generateWayNE(): TPosition {
    return {
      x: this.currentCord.x + SQUARE_SIZE.WIDTH,
      y: this.currentCord.y - SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWaySE(): TPosition {
    return {
      x: this.currentCord.x + SQUARE_SIZE.WIDTH,
      y: this.currentCord.y + SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWaySW(): TPosition {
    return {
      x: this.currentCord.x - SQUARE_SIZE.WIDTH,
      y: this.currentCord.y + SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWayNW(): TPosition {
    return {
      x: this.currentCord.x - SQUARE_SIZE.WIDTH,
      y: this.currentCord.y - SQUARE_SIZE.HEIGHT,
    };
  }
}

export default Ways;
