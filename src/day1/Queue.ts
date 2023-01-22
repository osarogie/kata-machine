type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class Queue<T> {
  public length: number = 0;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {}

  enqueue(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;
    if (!!this.tail) {
      this.tail!.next = node;
      this.tail = node;
    } else {
      this.head = this.tail = node;
    }
  }
  deque(): T | undefined {
    const head = this.head;
    if (!head) {
      return undefined;
    }
    this.length--;

    this.head = head?.next;
    head.next = undefined;

    if (this.length === 0) {
      this.tail = undefined;
    }

    return head.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
