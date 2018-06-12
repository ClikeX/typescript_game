class PlayertMoveBehaviour extends MoveBehaviour {

  constructor(context: GameObject) {
    super(context)
    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }

  public move(): void {
    this.context.x += this._xSpeed;
    this.context.y += this._ySpeed;
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 87:
        this._ySpeed = -5;
        break
      case 83:
        this._ySpeed = 5;
        break
      case 65:
        this._xSpeed = -5;
        break
      case 68:
        this._xSpeed = 5;
        break
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 87:
        this._ySpeed = 0;
        break
      case 83:
        this._ySpeed = 0;
        break
      case 65:
        this._xSpeed = 0;
        break
      case 68:
        this._xSpeed = 0;
        break
    }
  }
}