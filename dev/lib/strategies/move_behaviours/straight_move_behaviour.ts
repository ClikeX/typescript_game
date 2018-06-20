class StraightMoveBehaviour extends MoveBehaviour {

  constructor(context: GameObject) {
    super(context)
  }

  public move(): void {
    this.context.x += this._xSpeed;
  }
}