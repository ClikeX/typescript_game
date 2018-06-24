class EnemyFactory {
  static create(amount: number, x: number, minY: number, maxY: number): void {
    for (let index = 0; index <= amount; index++) {
      let y_pos = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      // new BasicEnemy(x, y_pos);
      Game.instance().enemies.push(new BasicEnemy(x, y_pos));
    }
  }
}