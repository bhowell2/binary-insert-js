declare type Comparator<T> = (a: T, b: T) => number;
export declare function binaryInsert<T>(array: T[], insertValue: T, comparator: Comparator<T>): T[];
export {};
