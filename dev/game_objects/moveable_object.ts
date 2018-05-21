/// <reference path="../lib/strategies/move_behaviours/move_behaviour.ts"/>

abstract class MoveableObject extends GameObject {
  private moveBehaviour!: MoveBehaviour;

  constructor(x: number, y: number) {
    super(x, y, 'movable_object');

    this.setMoveBehaviour(this.moveBehaviour)
  }

  public setMoveBehaviour(behaviour: MoveBehaviour) {
    this.moveBehaviour = behaviour;
  }
}