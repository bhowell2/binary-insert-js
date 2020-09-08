const {binaryInsert} = require("./dist/lib/binaryInsert");

const {performance} = require('perf_hooks');

const numberOfRuns = 50;

const singleValueBenchmark = {binary: {}, insertThenSort: {}};

function updateBenchmarkAverage(benchmark, name, val) {
  if (benchmark.hasOwnProperty(name)) {
    benchmark[name] = (benchmark[name] + val) / 2;
  } else {
    benchmark[name] = val;
  }
}

function numberComparator(a,b) {
  return a - b;
}

/*
* Generate a benchmark for a single value insertion for binary insertion
* and for insert-then-sort.
* */
for (let a = 0; a < numberOfRuns; a++) {
  for (let i = 1; i <= 6; i++) {
    const arraySize = Math.pow(10, i);

    const insertThenSortArray = [];

    for (let j = 0; j < arraySize; j++) {
      // using integers so there is more likelihood of overlap in values than a double
      insertThenSortArray.push(Math.floor(Math.random() * arraySize));
    }
    insertThenSortArray.sort(numberComparator);

    const binaryInsertArray = [];
    for (let j = 0; j < arraySize; j++) {
      // will be sorted, because insert then sort is sorted above
      binaryInsertArray.push(insertThenSortArray[j]);
    }

    const randInsertValue = Math.floor(Math.random() * arraySize);

    const startBinInsert = performance.now();
    binaryInsert(binaryInsertArray, randInsertValue, numberComparator)
    const stopBinInsert = performance.now();

    const startSortAfterInsertions = performance.now();
    insertThenSortArray.push(randInsertValue);
    insertThenSortArray.sort(numberComparator)
    const stopSortAfterInsertions = performance.now();

    updateBenchmarkAverage(singleValueBenchmark.binary, arraySize, stopBinInsert - startBinInsert);
    updateBenchmarkAverage(singleValueBenchmark.insertThenSort, arraySize, stopSortAfterInsertions - startSortAfterInsertions);

  }
  global.gc();
}

/*
* In the multiInsertBenchmark 10, 100, 300, 600, and 900 items
* will be inserted at once for the different array sizes.
* */

const multiInsertBenchmark = {binary:{}, insertThenSort: {}};

const multiInsertSizes = [10, 100, 300, 600, 900];
for (let i = 0; i < multiInsertSizes.length; i++) {
  multiInsertBenchmark.binary[multiInsertSizes[i]] = {};
  multiInsertBenchmark.insertThenSort[multiInsertSizes[i]] = {};
}

for (let a = 0; a < numberOfRuns; a++) {
  for (let i = 1; i <= 6; i++) {
    const arraySize = Math.pow(10, i);
    for (let j = 0; j < multiInsertSizes.length; j++) {

      const randInsertValues = [];
      for (let k = 0; k < multiInsertSizes[j]; k++) {
        randInsertValues.push(Math.floor(Math.random() * arraySize));
      }

      const insertThenSortArray = [];

      for (let j = 0; j < arraySize; j++) {
        // using integers so there is more likelihood of overlap in values than a double
        insertThenSortArray.push(Math.floor(Math.random() * arraySize));
      }
      insertThenSortArray.sort(numberComparator);

      const binaryInsertArray = [];
      for (let j = 0; j < arraySize; j++) {
        // will be sorted, because insert then sort is sorted above
        binaryInsertArray.push(insertThenSortArray[j]);
      }

      const startBinInsert = performance.now();
      for (let k = 0; k < randInsertValues.length; k++) {
        binaryInsert(binaryInsertArray, randInsertValues[k], numberComparator)
      }
      const stopBinInsert = performance.now();

      const startSortAfterInsertions = performance.now();
      for (let k = 0; k < randInsertValues[k]; k++) {
        insertThenSortArray.push(randInsertValues[k]);
      }
      insertThenSortArray.sort(numberComparator)
      const stopSortAfterInsertions = performance.now();

      updateBenchmarkAverage(multiInsertBenchmark.binary[randInsertValues.length], arraySize, stopBinInsert - startBinInsert);
      updateBenchmarkAverage(multiInsertBenchmark.insertThenSort[randInsertValues.length], arraySize, stopSortAfterInsertions - startSortAfterInsertions);
    }
  }
  global.gc();
}

console.log(`Averaged over ${numberOfRuns} runs.`)
console.log("\t\t\t\tSINGLE VALUE INSERT RESULTS")
console.log(`Array Size\t\t\tBinary Insert (ms)\t\t\tInsert then Sort (ms)`)
let outputString = "";
// keys are the same for both binary and insert, so can use same key for both
for (let key in singleValueBenchmark.binary) {
  outputString += `${key}\t\t\t\t${singleValueBenchmark.binary[key].toFixed(6)}\t\t\t\t${singleValueBenchmark.insertThenSort[key].toFixed(6)}\n`
}
console.log(outputString)
console.log("\t\t\t\t\t\t\tMULTI VALUE INSERT RESULTS")
console.log("Array Size\t\t\tNumber of Insertions\t\t\tBinary Insert (ms)\t\t\tInsert then Sort (ms)")
let multiInsertOutputStr = "";
for (let numInserts in multiInsertBenchmark.binary) {
  // console.log(numInserts)
  // console.log(multiInsertBenchmark.binary[numInserts])
  // console.log(multiInsertBenchmark.insertThenSort[numInserts])
  for (let arrySize in multiInsertBenchmark.binary[numInserts]) {
    multiInsertOutputStr += `${arrySize}\t\t\t\t${numInserts}\t\t\t\t\t${multiInsertBenchmark.binary[numInserts][arrySize].toFixed(6)}\t\t\t\t${multiInsertBenchmark.insertThenSort[numInserts][arrySize].toFixed(6)}\n`
  }
  multiInsertOutputStr += "\n"
}
console.log(multiInsertOutputStr)
