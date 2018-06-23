/// <reference path="./drawable.ts"/>

abstract class GameObject extends Drawable {

  /**
   * Basic game object
   * @param x X position
   * @param y Y position
   * @param tag Html semantic tag name
   * @param parent parent object to append to
   */
  constructor(x: number, y: number, tag: string) {
    super(x, y, tag)
  }

  protected abstract collide(): void

  public outOfBounds(): boolean {
    let h = parent.innerHeight;
    let w = parent.innerWidth
    return (this.x <= 0 || this.x >= w) || (this.y <= 0 || this.y >= h)
  }

  protected keepFromOutOfBounds(): void {
    this.x = Util.clamp(this.x, 0, (this._parent.offsetWidth - this._div.offsetWidth));
    this.y = Util.clamp(this.y, 0, (this._parent.offsetHeight - this._div.offsetHeight));
  }

  public hasCollision(obj: GameObject): boolean {
    if (this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y) {
      this.collide();
      obj.collide();
      return true;
    } else {
      return false;
    }
  }
  public hasCollisions(array: Array<GameObject>, func: Function): void {
    for (let index = 0; index < array.length; index++) {
      let element = array[index];
      if (this.hasCollision(element)) {
        func(this, element);
        break;
      }
    }
  }
}

