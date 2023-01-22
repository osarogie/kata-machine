// Function to find Median
function findMedian(arr: number[]) {
  let a = 0;
  let b = 0;

  // Returns the correct position of
  // pivot element
  function partition(arr: number[], low: number, high: number) {
    let pivotValue = arr[high];
    let storeIdx = low;

    for (let i = low; i < high; i++) {
      if (arr[i] <= pivotValue) {
        const tmp = arr[storeIdx];
        arr[storeIdx] = arr[i];
        arr[i] = tmp;
        storeIdx++;
      }
    }

    arr[high] = arr[storeIdx];
    arr[storeIdx] = pivotValue;

    return storeIdx;
  }
  // Utility function to find median
  function medianUtil(arr: number[], low: number, high: number, k: number) {
    if (low > high) {
      return;
    }
    // Find the partition index
    let partitionIndex = partition(arr, low, high);
    // If partition index = k, then we found the median of odd number element in arr[]
    if (partitionIndex == k) {
      b = arr[partitionIndex];
      if (a != -1) {
        return;
      }
    } else if (partitionIndex == k - 1) {
      a = arr[partitionIndex];
      if (b != -1) {
        return;
      }
    }

    console.log({
      p: partitionIndex,
      l: low,
      h: high,
      arr,
    });

    // If partitionIndex >= k then find the index in first half of the arr[]
    if (partitionIndex >= k) {
      medianUtil(arr, low, partitionIndex - 1, k);
    } else {
      medianUtil(arr, partitionIndex + 1, high, k);
    }
  }

  const n = arr.length;
  let ans = 0;
  a = -1;
  b = -1;
  medianUtil(arr, 0, n - 1, (n / 2) | 0);
  // If n is odd
  if (n % 2 == 1) {
    ans = b;
  } else {
    ans = (a + b) / 2;
  }

  return ans;
}

const arr = [12, 6, 18, 3, 5, 4, 9, 11, 27, 41, 19, 26];
const median = findMedian(arr);

console.log(median);

if (typeof test === "function") {
  test("find-median", function () {
    expect(median).toEqual(11.5);
  });
} else {
  if (median !== 11.5) {
    throw new Error(`Expected 11.5. Got ${median}`);
  }
}
