/// <reference path="lib/game_object.ts"/>
/// <reference path="lib/game_objects/moveable_object.ts"/>

class Spaceship extends MoveableObject {
    private _shootBehaviour!: ShootBehaviour;

    get shootBehaviour(): ShootBehaviour { return this._shootBehaviour }
    set shootBehaviour(behaviour: ShootBehaviour) { this._shootBehaviour = behaviour }

    constructor() {
        super(50, 50, 'Spaceship');
        console.log("Spaceship created")
        this.moveBehaviour = new PlayertMoveBehaviour(this);
        this.shootBehaviour = new PlayertShootBehaviour(this);

    }
    update() {
        // Calculate movements
        this.moveBehaviour.move();
        // Keep object from going out of bounds
        this.keepFromOutOfBounds();
        // Draw the HTML
        this.draw();
    }
}
