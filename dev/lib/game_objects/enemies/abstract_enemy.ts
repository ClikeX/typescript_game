/// <reference path="../abstract/game_object.ts"/>
/// <reference path="../abstract/moveable_object.ts"/>

abstract class AbstractEnemy extends MoveableObject {
  protected abstract _score: number;

  get score(): number { return this._score }

  public abstract notify(): void;

  public hit(): void {
    Game.instance().enemies.forEach(e => {
      e.notify();
    });
    this.remove()
  }
}
