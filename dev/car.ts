/// <reference path="lib/game_object.ts"/>

class Car extends GameObject{
    constructor() {
        super(0, 0, 'Car');
        console.log("car created")
    }
    update() {
        console.log("vrooom!")
    }
}
