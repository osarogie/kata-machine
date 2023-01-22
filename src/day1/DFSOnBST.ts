export default function dfs(head: BinaryNode<number>, needle: number): boolean {
  if (head.value === needle) {
    return true;
  }

  if (head.left && needle < head.value) {
    return dfs(head.left, needle);
  }

  if (head.right && needle > head.value) {
    return dfs(head.right, needle);
  }

  return false;
}
