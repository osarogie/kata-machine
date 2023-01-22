type Node<T> = {
  value: T;
  prev?: Node<T>;
};

export default class Stack<T> {
  public length: number = 0;
  private head?: Node<T>;

  push(item: T): void {
    const node: Node<T> = { value: item };
    this.length++;

    if (!this.head) {
      this.head = node;

      return;
    }

    node.prev = this.head;
    this.head = node;
  }
  pop(): T | undefined {
    const head = this.head;
    if (!head) {
      return undefined;
    }
    this.length--;
    this.head = head.prev;
    head.prev = undefined;

    return head?.value;
  }
  peek(): T | undefined {
    return this.head?.value;
  }
}
