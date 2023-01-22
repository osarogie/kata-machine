export default function two_crystal_balls(breaks: boolean[]): number {
  const jump = Math.sqrt(breaks.length);
  let i = 0;

  for (; i < breaks.length; i += jump) {
    if (breaks[i]) {
      i -= jump;
      break;
    }
  }

  const high = i + jump;
  for (; i <= high && i < breaks.length; i++) {
    if (breaks[i]) {
      return i;
    }
  }

  return -1;
}
