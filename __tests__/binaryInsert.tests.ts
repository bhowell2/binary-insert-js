import { binaryInsert } from "../index";

function numberComparator(a: number, b: number): number {
  return a - b;
}

test("Insert random order.", () => {
  const ary: number[] = []
  for (let i = 0; i < 1000; i++) {
    if (i % 5 == 0) {
      // insert negative number
      binaryInsert(ary, -1 * Math.random() * 1000, numberComparator);
    } else {
      binaryInsert(ary, Math.random() * 1000, numberComparator);
    }
  }
  for (let i = 0; i < ary.length - 1; i++) {
    expect(ary[i]).toBeLessThanOrEqual(ary[i + 1]);
  }
})

test("Append to front of array.", () => {

  const emptyArray: number[] = [];
  binaryInsert(emptyArray, -6, numberComparator);
  binaryInsert(emptyArray, -9, numberComparator);
  binaryInsert(emptyArray, -1000, numberComparator);
  expect(emptyArray).toEqual([-1000, -9, -6]);

  const prefilledAry = [-5, -1, 0, 1, 5];
  binaryInsert(prefilledAry, -6, numberComparator);
  binaryInsert(prefilledAry, -9, numberComparator);
  binaryInsert(prefilledAry, -9, numberComparator);
  binaryInsert(prefilledAry, -199, numberComparator);
  expect(prefilledAry).toEqual([-199, -9, -9, -6, -5, -1, 0, 1, 5]);

  const ary = [0, 1, 5, 10];
  binaryInsert(ary, -31415, numberComparator);
  binaryInsert(ary, -1, numberComparator);
  binaryInsert(ary, -2, numberComparator);
  binaryInsert(ary, 0, numberComparator);
  expect(ary).toEqual([-31415, -2, -1, 0, 0, 1, 5, 10]);

})

test("Insert all over.", () => {
  const ary = [-2, -1, -1, 0, 3, 99];
  binaryInsert(ary, -2, numberComparator);
  binaryInsert(ary, 50, numberComparator);
  binaryInsert(ary, 0, numberComparator);
  binaryInsert(ary, 1, numberComparator);
  binaryInsert(ary, -1, numberComparator);
  binaryInsert(ary, 50, numberComparator);
  expect(ary).toEqual([-2, -2, -1, -1, -1, 0, 0, 1, 3, 50, 50, 99])
})

test("Append to end of array.", () => {

  const emptyArray: number[] = [];
  binaryInsert(emptyArray, -99, numberComparator)
  binaryInsert(emptyArray, -1, numberComparator)
  binaryInsert(emptyArray, 0, numberComparator)
  binaryInsert(emptyArray, 1, numberComparator)
  binaryInsert(emptyArray, 22, numberComparator)
  binaryInsert(emptyArray, 5555, numberComparator)
  expect(emptyArray).toEqual([-99, -1, 0, 1, 22, 5555]);

  const prefilledArray = [-5, -1, 0, 10, 22];
  binaryInsert(prefilledArray, 22, numberComparator);
  binaryInsert(prefilledArray, 23, numberComparator)
  binaryInsert(prefilledArray, 999, numberComparator)
  expect(prefilledArray).toEqual([-5, -1, 0, 10, 22, 22, 23, 999]);

})

test("Repeating values.", () => {
  const sameValueArray = [99, 99, 99, 99];
  binaryInsert(sameValueArray, 99, numberComparator);
  expect(sameValueArray).toEqual([99, 99, 99, 99, 99]);

  const ary = [0, 0, 0, 0];
  binaryInsert(ary, 0, numberComparator);
  binaryInsert(ary, 99, numberComparator)
  binaryInsert(ary, 99, numberComparator)
  binaryInsert(ary, 0, numberComparator);
  binaryInsert(ary, 99, numberComparator)
  expect(ary).toEqual([0, 0, 0, 0, 0, 0, 99, 99, 99]);
})

test("Small spread of values.", () => {
  const ary = [-1, -1, 0, 0, 1, 1, 1];
  binaryInsert(ary, 0, numberComparator);
  binaryInsert(ary, 0, numberComparator);
  binaryInsert(ary, -1, numberComparator);
  binaryInsert(ary, 1, numberComparator);
  binaryInsert(ary, 0, numberComparator);
  expect(ary).toEqual([-1, -1, -1, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
})
