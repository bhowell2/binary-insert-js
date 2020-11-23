# Binary Insert for Javascript
Simple function `binaryInsert(array, value, comparator)` that provides binary insert functionality for a **sorted**
array in javascript. This is mostly intended for larger arrays, and the performance gain may be viewed in the [benchmark](#benchmarks). 

Binary insertion is `O(log(n))` while Javascript's `.sort()` (using quicksort or similar) is `O(n * log(n))`, while linear insertion is `O(n)`.
When inserting a single value *(in a sorted array)* binary insertion is the clear winner; however this breaks down when 
inserting multiple values (`a`) because each time binary insertion is used it will have a cost of `O(log(n))`, which 
will result in a cost of `O(a * log(n))`. At first glance this may appear to be the same as Javascript's sort implementation, but 
it has quite the performance difference when multiple values are inserted as can be viewed in the benchmarks below.

If you're inserting into a large sorted list, but not necessarily all at once this can provide much higher performance 
than sorting every time you add an element, or even when you add multiple values and then sort. However, if you're adding 
quite a few values (especially on larger arrays) and then sorting after you will see better performance - refer to benchmarks to  see where this breaks 
down in terms of number of insertions and array size.

**Note, the array MUST be SORTED or the insert position will be nonsensical.**

## Example usage
`npm install binary-insert`
```javascript
import { binaryInsert } from "binary-insert";
// or can do:
const binaryInsert = require('binary-insert').binaryInsert;

const ary = [1,2,3,5];
const comparator = (a,b) => a - b;
binaryInsert(ary, 4, comparator); // this actually returns ary as well
// ary = [1,2,3,4,5]
```

## Benchmarks
The benchmark results can be viewed below and a quick a snapshot of them is given in the tables here too. These were 
done on a Macbook Pro with (Haswell) 2.3 GHz Quad-Core Intel Core i7. The benchmark action can also be run to obtain 
similar results on whatever is powering the Github action workflows. The array values were the same for both binary 
and insert-then-sort and the insertion values were randomly generated (but the same values were used for both binary 
and insert-then-sort insertions).

#### Single value insert (averaged over 50 runs)
| Array Size | Binary Insert (ms) | Insert then sort (ms) |
|------------:|:------------:|:------------:|
| 10            | 0.007095 | 0.001031 |
| 100           | 0.002791 | 0.003197 |
| 1,000         | 0.002635 | 0.022575 |
| 10,000        | 0.008906 | 0.214727 |
| 100,000       | 0.029025 | 2.354665 |
| 1,000,000     | 0.790569 | 26.176829 |

#### Multi value insert (array size = 100,000, averaged over 50 runs)
| Number of insertions | Binary Insert (ms) | Insert then sort (ms) |
| ---: | :---: | :---: |
|   10      |   0.126522      |   2.469704   |
|   100     |   1.635489      |   2.514384   |
|   300     |   4.972899      |   2.510613   |
|   600     |   9.857568      |   2.611133   |
|   900     |   23.032073     |   2.668079  |
```
Averaged over 50 runs.
				SINGLE VALUE INSERT RESULTS
Array Size			Binary Insert (ms)			Insert then Sort (ms)
10				0.007095				0.001031
100				0.002791				0.003197
1000				0.002635				0.022575
10000				0.008906				0.214727
100000				0.029025				2.354665
1000000				0.790569				26.176829

							MULTI VALUE INSERT RESULTS
Array Size			Number of Insertions			Binary Insert (ms)			Insert then Sort (ms)
10				10					0.003544				0.000874
100				10					0.001907				0.098443
1000				10					0.002778				0.029314
10000				10					0.013893				0.200234
100000				10					0.126522				2.469704
1000000				10					6.533801				26.832977

10				100					0.010288				0.000621
100				100					0.016141				0.006602
1000				100					0.024389				0.027441
10000				100					0.165347				0.295880
100000				100					1.635489				2.514384
1000000				100					19.314336				25.200716

10				300					0.028600				0.000865
100				300					0.046016				0.004789
1000				300					0.080592				0.035301
10000				300					0.422537				0.257292
100000				300					4.972899				2.510613
1000000				300					73.036811				27.031756

10				600					0.060059				0.000818
100				600					0.095325				0.005672
1000				600					0.150927				0.034564
10000				600					0.811396				0.261965
100000				600					9.857568				2.611133
1000000				600					110.728053				27.444640

10				900					0.103899				0.000797
100				900					0.157177				0.004501
1000				900					0.226895				0.031276
10000				900					1.372212				0.268816
100000				900					23.032073				2.668079
1000000				900					226.192967				27.160759

```

### An attempt at explaining the performance difference
*I haven't looked at the V8 source, and I'm actually making some assumptions here on the underlying implementation of 
splice and push based on the performance noticed here.*

The Big-O of Binary Insert really looks more like `O(log(n) + n)`, which is the sum of finding the insertion point (`O(log(n))`)
and resizing the array (`O(n)` - via `splice()`) to insert the value.

The Big-O of Insert-then-sort really looks more like `O(n * log(n) + n)`, which is the sum of sorting the array (`O(n * log(n))`)
and pushing (`O(n)`) an element onto the array. However, Javascript's `Array` probably acts like an `ArrayList` where 
pushing a value will resize the array once, but not multiple times (well, unless the resized amount has been exceeded). 
So, when inserting multiple values the array is (usually) only resized once, so the resize penalty is not paid each time 
like it is with Binary Insert (which uses splice to insert the element).

So, when inserting multiple elements (`a`) the cost for Binary Insert is `O(a * (log(n) + n))`.
Yet, the cost for Insert-then-sort is still (roughly) the same at `O(n * log(n) + n)`.

There is, of course, more going on than this reduction, as it doesn't perfectly explain the output, but it should 
provide a pretty intuitive explanation for the benchmark results.
