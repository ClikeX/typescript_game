/// <reference path="./abstract/game_object.ts"/>
/// <reference path="./abstract/moveable_object.ts"/>

class Spaceship extends MoveableObject {
    private _shootBehaviour!: ShootBehaviour;
    private _observers!: Array<iObserver>;

    get shootBehaviour(): ShootBehaviour { return this._shootBehaviour }
    set shootBehaviour(behaviour: ShootBehaviour) { this._shootBehaviour = behaviour }

    get observers(): Array<iObserver> { return this._observers }

    constructor() {
        super(100, 130, 'Spaceship');
        console.log("Spaceship created")
        this.moveBehaviour = new PlayertMoveBehaviour(this);
        this.shootBehaviour = new PlayertShootBehaviour(this);
    }
    public update() {
        // Calculate movements
        this.moveBehaviour.move();
        // Keep object from going out of bounds
        this.keepFromOutOfBounds();
        // Draw the HTML
        this.draw();
    }
    public notify() {

    }

    public subscribe(o: any): void {
        this.observers.push(o);
    }

    public unsubscribe(o: any): void {
        let i: number = this.observers.indexOf(o);
        if (i != -1) {
            this.observers.splice(i, 1);
        }
    }

    protected collide(): void {

    }
}
