/**
 * @fileOverview A collection of utility functions.
 * @module lab3
 */

import { fib } from './lab2.js'; // Assuming lab2.js is in the same directory

/**
 * Returns the fractional part of a number.
 * For negative numbers, it returns 1 - |fractional_part_if_positive|.
 * Example: getDecimal(-1.23) returns 0.77 because -1.23 = -2 + 0.77
 * @param {number} num The input number.
 * @returns {number} The fractional part.
 * @example
 * getDecimal(1.23)  // 0.23
 * getDecimal(-1.23) // 0.77
 * getDecimal(1)     // 0
 * getDecimal(0)     // 0
 * getDecimal(-1)    // 0
 */
export function getDecimal(num) {
    if (Number.isInteger(num)) {
        return 0;
    }
    // For positive numbers: num - Math.floor(num)
    // For negative numbers: num - Math.floor(num) also works correctly to get the positive fractional part
    // e.g. -1.23 - Math.floor(-1.23) = -1.23 - (-2) = 0.77
    let fractional = num - Math.floor(num);
    // Fix potential floating point inaccuracies for results very close to 0 or 1
    if (Math.abs(fractional) < 1e-9 || Math.abs(1 - fractional) < 1e-9 && num < 0) {
        return 0;
    }
     // Handle specific case like -0.something giving a result very close to 1
    if (num < 0 && num > -1 && fractional !== 0) { // e.g. -0.5 should yield 0.5
        return num + 1;
    }
    return fractional;
}


/**
 * Normalizes a URL to ensure it starts with "https://".
 * @param {string} url The input URL.
 * @returns {string} The normalized URL starting with "https://".
 * @example
 * normalizeUrl('yandex.ru')         // 'https://yandex.ru'
 * normalizeUrl('http://yandex.ru')  // 'https://yandex.ru'
 * normalizeUrl('https://yandex.ru') // 'https://yandex.ru'
 * normalizeUrl('https.ru')          // 'https://https.ru'
 */
export function normalizeUrl(url) {
    if (url.startsWith('https://')) {
        return url;
    }
    if (url.startsWith('http://')) {
        return 'https://' + url.substring(7);
    }
    return 'https://' + url;
}

/**
 * Checks if a string contains spam keywords "viagra" or "XXX" (case-insensitive).
 * @param {string} str The input string.
 * @returns {boolean} True if spam is detected, false otherwise.
 * @example
 * checkSpam('_XxX_')       // true
 * checkSpam('__Viagra__')  // true
 * checkSpam('innocent rabbit') // false
 */
export function checkSpam(str) {
    const lowerStr = str.toLowerCase();
    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

/**
 * Truncates a string if it's longer than the specified maximum length.
 * If truncated, the end of the string is replaced with the ellipsis character "…".
 * @param {string} str The string to truncate.
 * @param {number} maxlength The maximum length of the string.
 * @returns {string} The (potentially) truncated string.
 * @example
 * truncate('What I\'d like to tell on this topic is:', 20) // 'What I\'d like to te…'
 * truncate('Hi everyone!', 20)                            // 'Hi everyone!'
 * truncate('Мама мыла раму.', 10)                         // 'Мама мыла…'
 */
export function truncate(str, maxlength) {
    if (str.length <= maxlength) {
        return str;
    }
    return str.slice(0, maxlength - 1) + '…'; // U+2026 is one character
}

/**
 * Helper function to uppercase the first character of a string.
 * @param {string} str The input string.
 * @returns {string} String with the first character uppercased.
 */
function ucFirst(str) {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
}

/**
 * Converts a dash-separated string into camelCase.
 * e.g., 'my-short-string' becomes 'myShortString'.
 * Uses {@link ucFirst} internally.
 * @param {string} str The input string (e.g., 'var-test-text').
 * @returns {string} The camelCased string (e.g., 'varTestText').
 * @example
 * camelize('background-color') // 'backgroundColor'
 * camelize('list-style-image') // 'listStyleImage'
 * camelize('-webkit-transition') // 'WebkitTransition' (leading dash results in capitalized first word)
 */
export function camelize(str) {
    return str
        .split('-')
        .map((word, index) => {
            if (index === 0 && word === '') { // handles cases like '-webkit-transition' where first part is empty
                return '';
            }
            return (index === 0 && word !== '') ? word : ucFirst(word);
        })
        .join('');
}


/**
 * Generates an array of Fibonacci numbers up to (but not including) the n-th number.
 * Uses the `fib` function imported from `./lab2.js`.
 * @param {number} n - The count of Fibonacci numbers to generate. (e.g., n=5 means fib(0) to fib(4))
 *                     Must be a non-negative integer.
 * @returns {BigInt[]} An array of the first n Fibonacci numbers. Returns an empty array if n is 0.
 * @throws {Error} If n is negative or not an integer.
 * @example
 * fibs(5) // [0n, 1n, 1n, 2n, 3n]
 * fibs(1) // [0n]
 * fibs(0) // []
 */
export function fibs(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("Input must be a non-negative integer for count.");
    }
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(fib(i)); // fib is imported from lab2.js
    }
    return result;
}

/**
 * Returns a new array with elements sorted in descending order.
 * The original array is not modified.
 * @param {number[]} arr The input array of numbers.
 * @returns {number[]} A new array sorted in descending order.
 * @example
 * arrReverseSorted([1, 3, 22, -5, 0]) // [22, 3, 1, 0, -5]
 */
export function arrReverseSorted(arr) {
    return [...arr].sort((a, b) => b - a);
}

/**
 * Returns a new array containing only unique values from the input array.
 * The order of elements from the original array is generally preserved for the first occurrences.
 * Works with values of any type.
 * @param {Array<any>} arr The input array.
 * @returns {Array<any>} A new array with unique values.
 * @example
 * unique([0, 1, 1, 2, 1, 0]) // [0, 1, 2]
 * unique(['a', 'b', 'c', 'c', 'a']) // ['a', 'b', 'c']
 * unique([true, false, true]) // [true, false]
 */
export function unique(arr) {
    return Array.from(new Set(arr));
}
