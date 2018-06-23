interface Observable {
  observers: Array<iObserver>;

  notify(): void;
  subscribe(o: iObserver): void;
  unsubscribe(o: iObserver): void;
}