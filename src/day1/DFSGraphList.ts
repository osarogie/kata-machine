function walk(
  graph: WeightedAdjacencyList,
  curr: number,
  prev: number[],
  seen: boolean[],
  distance: number[],
) {
  if (seen[curr]) {
    return;
  }

  seen[curr] = true;
  const edges = graph[curr];

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    const dist = distance[curr] + edge.weight;

    if (dist < distance[edge.to]) {
      distance[edge.to] = dist;
      prev[edge.to] = curr;
    }

    walk(graph, edge.to, prev, seen, distance);
  }
}

export default function dfs(
  graph: WeightedAdjacencyList,
  source: number,
  needle: number,
): number[] | null {
  const prev: number[] = new Array(graph.length).fill(-1);
  const seen: boolean[] = new Array(graph.length).fill(false);
  const distance: number[] = new Array(graph.length).fill(Infinity);

  distance[source] = 0;

  walk(graph, source, prev, seen, distance);

  if (distance[needle] === Infinity) {
    return null;
  }

  const path: number[] = [needle];
  let curr = prev[needle];
  while (curr !== -1) {
    path.push(curr);
    curr = prev[curr];
  }

  return path.reverse();
}
