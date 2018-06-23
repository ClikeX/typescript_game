/// <reference path="../abstract/game_object.ts"/>
/// <reference path="../abstract/moveable_object.ts"/>
/// <reference path="./abstract_enemy.ts"/>


class BasicEnemy extends AbstractEnemy {
  private _shootBehaviour!: ShootBehaviour;
  protected _score = 5;
  get shootBehaviour(): ShootBehaviour { return this._shootBehaviour }

  constructor(x: number, y: number, ) {
    super(x, y, 'enemy');
    this.moveBehaviour = new StraightMoveBehaviour(this);
    this.moveBehaviour.xSpeed = -3;
  }
  update() {
    if (this.outOfBounds()) {
      this.remove()
    }
    // Calculate movements
    this.moveBehaviour.move();
    // Draw the HTML
    this.draw();
  }

  public remove() {
    super.remove();
    Util.removeFromArray(Game.getInstance().enemies, this)
  }

  protected collide(): void {

  }
}
