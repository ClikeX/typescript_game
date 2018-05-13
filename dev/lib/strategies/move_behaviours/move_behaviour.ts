abstract class MoveBehaviour {
  protected context: GameObject;

  constructor(context: GameObject) {
    this.context = context;
  }

  public abstract move();
  public abstract onKeyyDown();
}