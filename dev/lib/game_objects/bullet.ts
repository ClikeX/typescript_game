/// <reference path="./abstract/game_object.ts"/>
/// <reference path="./abstract/moveable_object.ts"/>

class Bullet extends MoveableObject {
  constructor(context: GameObject) {
    super((context.x + (context.width / 2)), (context.y - (context.height / 2)), 'Bullet');
    this.moveBehaviour = new StraightMoveBehaviour(this);
    this.moveBehaviour.xSpeed = 5;
  }
  update() {
    if (this.outOfBounds()) {
      this.remove()
    }
    // Calculate movements
    this.move();
    // Draw the HTML
    this.draw();

  }

  public remove() {
    super.remove();
    Util.removeFromArray(Game.instance().projectiles, this)
  }

  protected collide(): void {

  }
}
