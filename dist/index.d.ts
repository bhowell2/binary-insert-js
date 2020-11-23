/**
 * Function that takes in two values and compares them.
 * < 0 - should be returned when a < b
 * = 0 - should be returned when a == b
 * > 0 - should be returned when a > b
 */
declare type Comparator<T> = (a: T, b: T) => number;
/**
 * Takes in a __SORTED__ array and inserts the provided value into
 * the correct, sorted, position.
 * @param array the sorted array where the provided value needs to be inserted (in order)
 * @param insertValue value to be added to the array
 * @param comparator function that helps determine where to insert the value (
 */
export declare function binaryInsert<T>(array: T[], insertValue: T, comparator: Comparator<T>): T[];
export {};
