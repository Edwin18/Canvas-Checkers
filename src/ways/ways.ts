import Checkers from "../checkers/checkers";
import {TWays, Tposition} from '../types';
import {SQUARE_SIZE} from "../const";

// Оперделять я буду с помощь метода find() и если он даст тру тогда это текущий массив, если фолс значит другой, что бы не делать 2 проверки.
// Определить к чьей команде относистя checkers, потом пропустить все пути через свою команду что бы отсеить вообще существующие пути
// потом оставшиеся пути через команду противника что бы понять есть ли боевые ходы

class Ways {
  private team: Array<Checkers>;
  private wayClear: SVGImageElement;
  private wayAttack: SVGImageElement;
  private currentCord: Tposition;
  private ways: Array<TWays>;

  constructor(
    private checkers: Checkers,
    private firstPlayer: Array<Checkers>,
    private secondPlayer: Array<Checkers>,
  ) {
    this.team = this.getTeam();

    this.wayClear = document.querySelector(`#way-clear`);
    this.wayAttack = document.querySelector(`#way-attack`);

    this.currentCord = this.checkers.getPositionForWays();

    this.ways = []; // пушить сюда объекты путей

    this.generateWays();
  }

  public getWays(): Array<TWays> {
    return this.ways.map((way) => ({
      svg: way.svg,
      x: way.x - SQUARE_SIZE.WIDTH / 2,
      y: way.y - SQUARE_SIZE.HEIGHT / 2,
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
      const result = this.team.find((checkers) => checkers.getPositionForWays().x === way.x && checkers.getPositionForWays().y === way.y);

      if (!result) {
        this.ways.push({
          svg: this.wayClear,
          x: way.x,
          y: way.y,
        });
      }
    });
  }

  private checkWayAttack() {
    // Сделать когда начнут ходить шашки!!!
  }

  private generateWayNE(): Tposition {
    return {
      x: this.currentCord.x + SQUARE_SIZE.WIDTH,
      y: this.currentCord.y - SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWaySE(): Tposition {
    return {
      x: this.currentCord.x + SQUARE_SIZE.WIDTH,
      y: this.currentCord.y + SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWaySW(): Tposition {
    return {
      x: this.currentCord.x - SQUARE_SIZE.WIDTH,
      y: this.currentCord.y + SQUARE_SIZE.HEIGHT,
    };
  }

  private generateWayNW(): Tposition {
    return {
      x: this.currentCord.x - SQUARE_SIZE.WIDTH,
      y: this.currentCord.y - SQUARE_SIZE.HEIGHT,
    };
  }
}

export default Ways;
