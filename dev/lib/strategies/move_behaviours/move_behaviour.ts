abstract class MoveBehaviour {
  protected context: GameObject;
  protected _ySpeed: number = 0;
  protected _xSpeed: number = 0;

  constructor(context: GameObject) {
    this.context = context;
  }
  public abstract move(): void;
}