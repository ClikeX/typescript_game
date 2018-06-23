/// <reference path="../abstract/game_object.ts"/>
/// <reference path="../abstract/moveable_object.ts"/>

abstract class AbstractEnemy extends MoveableObject {
  protected abstract _score: number;

  get score(): number { return this._score }
}
