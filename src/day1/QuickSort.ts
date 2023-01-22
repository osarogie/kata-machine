function qs(arr: number[], low: number, high: number) {
  if (low >= high) {
    return;
  }

  const pivot = partition(arr, low, high);
  qs(arr, low, pivot - 1);
  qs(arr, pivot + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
  let pivotValue = arr[high];
  let idx = low;

  for (let i = low; i < high; i++) {
    if (arr[i] <= pivotValue) {
      const tmp = arr[i];
      arr[i] = arr[idx];
      arr[idx] = tmp;
      idx++;
    }
  }

  arr[high] = arr[idx];
  arr[idx] = pivotValue;

  return idx;
}

export default function quick_sort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}

function findMedian(arr: number[]) {
  let mid = NaN;

  const medianSort = (arr: number[], low: number, high: number, k: number) => {
    if (low >= high) {
      return;
    }

    const pivot = partition(arr, low, high);

    if (pivot === k) {
      mid = pivot;
      return;
    } else if (pivot - 1 === k) {
      mid = pivot - 1;
      return;
    }

    if (pivot < k) {
      medianSort(arr, pivot + 1, high, k);
    } else {
      medianSort(arr, low, pivot - 1, k);
    }
  };

  const n = arr.length;
  medianSort(arr, 0, n - 1, (n / 2) | 0);

  if (n % 2 === 0) {
    return (arr[mid] + arr[mid + 1]) / 2;
  }

  return arr[mid];
}

const arr = [12, 6, 18, 26, 3];
quick_sort(arr);
console.log(arr);
console.log(`Median: ${findMedian(arr)}`);
