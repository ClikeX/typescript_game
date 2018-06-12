class Game {
    private static instance: Game;
    public static container = document.getElementById("container");
    private _player_ship: Spaceship;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    }

    private constructor() {
        requestAnimationFrame(() => this.gameLoop());
        this._player_ship = new Spaceship();
    }

    private gameLoop() {
        this._player_ship.update();
        requestAnimationFrame(() => this.gameLoop());

        if (this._player_ship.x == -150) {
            this.gameOver();
        }
    }

    private gameOver(): void {
        new GameOver();
    }
}

window.addEventListener("load", function () {
    let game = Game.getInstance();
});