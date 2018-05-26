class GameOver extends GameObject {
  public update(): void { }
  constructor() {
    super(window.innerWidth / 2 - 50, window.innerHeight / 2 - 25, "gameover");
    this.div.innerHTML = "GAME OVER";
  }
}