/// <reference path="../shoot_behaviours/shoot_behaviour.ts"/>
class PlayertShootBehaviour extends ShootBehaviour {

  constructor(context: GameObject) {
    super(context)
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyDown(e));
  }

  public shoot(): void {
    Game.instance().projectiles.push(new Bullet(this.context))
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 32:
        this.shoot();
        break
    }
  }
}