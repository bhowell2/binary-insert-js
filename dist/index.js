"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binaryInsert = void 0;
function binaryInsert(array, insertValue, comparator) {
    if (array.length === 0 || comparator(array[0], insertValue) >= 0) {
        array.splice(0, 0, insertValue);
        return array;
    }
    else if (array.length > 0 && comparator(array[array.length - 1], insertValue) <= 0) {
        array.splice(array.length, 0, insertValue);
        return array;
    }
    var left = 0, right = array.length;
    var leftLast = 0, rightLast = right;
    while (left < right) {
        var inPos = Math.floor((right + left) / 2);
        var compared = comparator(array[inPos], insertValue);
        if (compared < 0) {
            left = inPos;
        }
        else if (compared > 0) {
            right = inPos;
        }
        else {
            right = inPos;
            left = inPos;
        }
        if (leftLast === left && rightLast === right) {
            break;
        }
        leftLast = left;
        rightLast = right;
    }
    array.splice(right, 0, insertValue);
    return array;
}
exports.binaryInsert = binaryInsert;
