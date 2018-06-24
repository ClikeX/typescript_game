class Game {
  private static _instance: Game;
  public container = document.getElementsByTagName("container")[0];
  private _player_ship: Player;
  public projectiles: Array<GameObject>;
  public enemies: Array<AbstractEnemy>;
  private _score: number;
  private _game_active = true;
  private _wave = 0;
  private _scoreboard: Scoreboard;
  private _wavecounter: WaveCounter;

  public get score(): number { return this._score }
  public set score(score: number) {
    this._score += score
    console.log(`Score: ${this._score}`);
  }

  public get wave(): number { return this._wave }

  public static instance(): Game {
    if (!this._instance) {
      this._instance = new Game();
    }
    return this._instance;
  }

  private constructor() {
    this._score = 0;
    this._scoreboard = new Scoreboard();
    this._wavecounter = new WaveCounter();
    this._player_ship = new Player();
    this.projectiles = new Array();
    this.enemies = new Array();

    // console.log(this.enemies.length);
    requestAnimationFrame(() => this.gameLoop());
  }

  private gameLoop() {
    // Update player
    this._player_ship.update();
    this._scoreboard.update();
    this._wavecounter.update();

    this.projectiles.forEach(projectile => {
      // Update projectiles
      projectile.update();
    });

    // Loop through enemies
    this.enemies.forEach(enemy => {
      if (enemy.hasCollision(this._player_ship)) {
        this.gameOver();
      }
      // Check for bullet hits
      enemy.hasCollisions(this.projectiles, function (enemy: AbstractEnemy, projectile: GameObject) {
        // If so, up score
        Game.instance().score = enemy.score;
        enemy.hit();
        projectile.remove();
      })
      enemy.update();
    });

    if (this.enemies.length <= 0) {
      this._wave += 1;
      EnemyFactory.create((5 + this._wave), window.innerWidth - 50, 20, 180);
    }
    if (this._game_active) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  private gameOver(): void {
    this._game_active = false;
    new GameOver();
  }
}

window.addEventListener("load", function () {
  Game.instance();
});