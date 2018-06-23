abstract class Drawable {
  //Fields
  protected _x: number = 0;
  protected _y: number = 0;
  protected _width: number = 0;
  protected _height: number = 0;
  protected _div: HTMLElement;
  protected _parent: HTMLElement;

  //Properties
  public get x(): number { return this._x; }
  public set x(value: number) { this._x = value; }

  public get y(): number { return this._y; }
  public set y(value: number) { this._y = value; }

  public get width(): number { return this._width; }
  public set width(v: number) { this._width = v; }

  public get height(): number { return this._height; }
  public set height(v: number) { this._height = v; }

  public get div(): HTMLElement { return this._div; }
  public set div(v: HTMLElement) { this._div = v; }

  /**
   * Basic drawable object
   * @param x X position
   * @param y Y position
   * @param tag Html semantic tag name
   * @param parent parent object to append to
   */
  constructor(x: number, y: number, tag: string) {
    this._x = x;
    this._y = y;

    this._parent = <HTMLElement>document.getElementsByTagName("container")[0];

    this._div = document.createElement(tag);
    this._parent.appendChild(this._div);

    this._width = this._div.clientWidth;
    this._height = this._div.clientHeight;

    this.draw();
  }

  /**
* Update function to override by child
*/
  public abstract update(): void

  /**
 * Draw function to override by child
 */
  public draw(): void {
    this._div.style.transform = `translate(${this._x}px, ${this._y}px)`;
  }

  public remove(): void {
    this.div.remove();
  }
}

