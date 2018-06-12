abstract class ShootBehaviour {
  protected context: GameObject;

  constructor(context: GameObject) {
    this.context = context;
  }
  public abstract shoot(): void;
}