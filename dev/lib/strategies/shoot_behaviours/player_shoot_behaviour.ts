/// <reference path="../shoot_behaviours/shoot_behaviour.ts"/>
class PlayertShootBehaviour extends ShootBehaviour {

  constructor(context: GameObject) {
    super(context)
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
  }

  public shoot(): void {
    // Spawn bullet objects from origin
    console.log("shooting");
    Game.getInstance().projectiles.push(new Bullet(this.context))
  }

  onKeyDown(event: KeyboardEvent): void {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 32:
        this.shoot();
        break
    }
  }
}