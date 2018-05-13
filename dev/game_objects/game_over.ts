class GameOver extends GameObject {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public div: HTMLElement;
  public update(): void { }

  constructor() {
    super(window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover");
    this.div.innerHTML = "GAME OVER";
  }
}