// function closestUnvisited(seen: boolean[], distance: number[]): number {
//   let min = -1;

//   for (let i = 0; i < distance.length; i++) {
//     if (seen[i]) {
//       continue;
//     }

//     if (min === -1 || distance[i] < distance[min]) {
//       min = i;
//     }
//   }

//   return min;
// }

export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  // for (;;) {
  //   const minNode = closestUnvisited(seen, distance);
  //   if (minNode === -1) {
  //     break;
  //   }
  // }
}
