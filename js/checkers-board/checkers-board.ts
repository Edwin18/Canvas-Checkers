class CheckersBoard {
  private board: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private firstPlayer: Array < {} > ;
  private secondPlayer: Array < {} > ;

  constructor(firstPlayer, secondPlayer) {
    this.board = document.querySelector(`#checkers`);
    this.ctx = this.board.getContext(`2d`);

    this.firstPlayer = firstPlayer;
    this.secondPlayer = secondPlayer;
  }
}