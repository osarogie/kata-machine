type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class SinglyLinkedList<T> {
  public length: number;
  private head: Node<T> | undefined;
  private tail: Node<T> | undefined;

  constructor() {
    this.length = 0;
  }

  prepend(item: T): void {
    this.length++;

    const node = { value: item } as Node<T>;
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }
  insertAt(item: T, idx: number): void {
    const node = { value: item } as Node<T>;
    if (idx === 0) {
      node.next = this.head;
      this.head = node;
      this.length++;
      return;
    }

    const curr = this.getNode(idx - 1);
    if (!curr) {
      throw new Error("Index out of bounds");
    }

    this.length++;
    node.next = curr.next;
    curr.next = node;
  }
  append(item: T): void {
    this.length++;

    const node = { value: item } as Node<T>;
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }
  remove(item: T): T | undefined {
    if (item === this.head?.value) {
      const oldHead = this.head;
      this.head = this.head.next;
      oldHead.next = undefined;

      this.length = Math.max(0, this.length - 1);

      return item;
    }

    let curr = this.head;

    while (curr) {
      if (curr.next?.value === item) {
        return this.removeNext(curr);
      }

      curr = curr.next;
    }

    return undefined;
  }
  get(idx: number): T | undefined {
    return this.getNode(idx)?.value;
  }
  removeAt(idx: number): T | undefined {
    if (idx === 0) {
      const oldHead = this.head;
      this.head = this.head?.next;
      this.length = Math.max(0, this.length - 1);
      return oldHead?.value;
    }

    const node = this.getNode(idx - 1);
    if (!node) {
      return undefined;
    }

    return this.removeNext(node);
  }

  private removeNext(node: Node<T>): T | undefined {
    const nextNode = node.next;
    if (!nextNode) {
      return;
    }

    this.length = Math.max(0, this.length - 1);
    node.next = nextNode.next;

    return nextNode.value;
  }

  private getNode(idx: number): Node<T> | undefined {
    let curr = this.head;

    for (let i = 0; i < idx; i++) {
      curr = curr?.next;
    }

    return curr;
  }

  log() {
    let curr = this.head;
    let text = `${curr} => ${curr?.next}`;

    for (let i = 0; i < this.length - 1; i++) {
      curr = curr?.next;
      text += ` => ${curr} => ${curr?.next}`;
    }
  }
}
