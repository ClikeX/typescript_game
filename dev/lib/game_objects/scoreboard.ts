/// <reference path="./abstract/game_object.ts"/>
class Scoreboard extends Drawable {

  constructor() {
    super(10, window.innerHeight / 10, "scoreboard");
  }

  public update(): void {
    this.div.innerHTML = `Score: ${Game.instance().score.toString()}`;
  }
}