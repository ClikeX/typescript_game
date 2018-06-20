abstract class MoveBehaviour {
  protected context: GameObject;
  protected _ySpeed: number = 0;
  protected _xSpeed: number = 0;

  get xSpeed(): number { return this._xSpeed }
  set xSpeed(speed: number) { this._xSpeed = speed }

  get ySpeed(): number { return this._ySpeed }
  set ySpeed(speed: number) { this._ySpeed = speed }

  constructor(context: GameObject) {
    this.context = context;
  }
  public abstract move(): void;
}