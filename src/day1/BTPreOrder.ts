export default function pre_order_search(head: BinaryNode<number>): number[] {
  function walk(curr: BinaryNode<number> | null, path: number[]) {
    if (!curr) {
      return path;
    }

    path.push(curr.value);

    walk(curr.left, path);
    walk(curr.right, path);

    return path;
  }

  return walk(head, []);
}
