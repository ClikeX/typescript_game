class Util {
  public static checkCollisions(object: GameObject, arr: Array<GameObject>): boolean {
    let val = false
    for (let object2 of arr) {
      if (Util.checkCollision(object, object2)) {
        val = true;
      }
      else {
        val = false;
      }
    }
    return val
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

  public static removeFromArray(array: Array<any>, object: any) {
    array.splice(array.indexOf(object), 1)
  }
}