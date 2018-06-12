class Util {
  public static checkCollisions(object: GameObject, arr: Array<GameObject>) {
    for (let object2 of arr) {
      if (Util.checkCollision(object, object2)) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  public static checkCollision(rect1: GameObject, rect2: GameObject): boolean {
    return (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y)
  }
  public static clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num;
  }
}