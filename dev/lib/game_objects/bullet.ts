/// <reference path="./abstract/game_object.ts"/>
/// <reference path="./abstract/moveable_object.ts"/>

class Bullet extends MoveableObject {
  constructor(context: GameObject) {
    super((context.x + (context.width / 2)), (context.y - (context.height / 2)), 'Bullet');
    this.moveBehaviour = new StraightMoveBehaviour(this);
    this.moveBehaviour.xSpeed = 5;
  }
  update() {
    // Calculate movements
    this.moveBehaviour.move();
    // Keep object from going out of bounds
    if (this.outOfBounds()) {
      this.remove();
    }
    // Draw the HTML
    this.draw();
  }
}
