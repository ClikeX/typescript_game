/// <reference path="./abstract/game_object.ts"/>
class WaveCounter extends Drawable {

  constructor() {
    super(10, window.innerHeight / 20, "wavecounter");
  }

  public update(): void {
    this.div.innerHTML = `Wave: ${Game.instance().wave.toString()}`;
  }
}