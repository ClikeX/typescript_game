class UI {
  public life: number = 100;

  private coindiv: HTMLElement;
  private lifediv: HTMLElement;

  constructor(game: Game) {
    this.coindiv = <HTMLElement>document.getElementsByTagName("counter")[0];
    this.coindiv.innerHTML = "100";

    this.lifediv = <HTMLElement>document.querySelector("lifebar progressbar");
    this.lifediv.style.width = this.life + "%";

    this.lifediv.classList.add("blinking");

  }

  public decreaseLife(amount: number): void {
    this.life -= amount;
    this.lifediv.style.width = this.life + "%";
  }
}