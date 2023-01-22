type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;
  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;
  private capacity: number;

  constructor(capacity: number) {
    this.length = 0;
    this.capacity = capacity;
    this.head = undefined;
    this.tail = undefined;
    this.lookup = new Map();
    this.reverseLookup = new Map();
  }

  update(key: K, value: V): void {
    let node = this.lookup.get(key);

    if (node) {
      node.value = value;
      this.detach(node);
    } else {
      this.length++;
      node = { value } as Node<V>;
      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    }

    this.prepend(node);
    this.trim();
  }

  get(key: K): V | undefined {
    const node = this.lookup.get(key);

    if (!node) {
      return undefined;
    }

    if (node === this.head) {
      return node.value;
    }

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: Node<V>) {
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }
    if (node === this.head) {
      this.head = this.head.next;
    }
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    node.next = node.prev = undefined;
  }

  private prepend(node: Node<V>) {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  private trim() {
    if (this.length <= this.capacity) {
      return;
    }

    const node = this.tail;
    if (!node) {
      return;
    }
    this.length--;
    if (node.prev) {
      this.tail = node.prev;
      this.tail.next = undefined;
    }
    const key = this.reverseLookup.get(node);
    this.lookup.delete(key!);
    this.reverseLookup.delete(node);
    node.next = node.prev = undefined;

    if (this.length === 0) {
      this.head = this.tail = undefined;
    }
  }
}
