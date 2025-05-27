// lab2/lab2.js

/**
 * Возвращает x в степени n.
 *
 * @param {number} x Основание.
 * @param {number} n Экспонента (целое число).
 * @returns {number} x в степени n.
 */
function pow(x, n) {
  if (n === 0) {
    return 1;
  }
  return Math.pow(x, n);
}

/**
 * Вычисляет сумму чисел от 1 до n включительно.
 * Эта функция создается с помощью конструктора `new Function`.
 *
 * @param {number} n Натуральное число, до которого вычисляется сумма.
 * @returns {number} Сумма чисел от 1 до n.
 */
const sumTo = new Function('n', `
  if (n < 1 || !Number.isInteger(n)) {
    console.warn("sumTo: n должно быть натуральным числом.");
    return NaN;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
`);

/**
 * Проверяет, является ли год високосным.
 *
 * @param {number} year Год для проверки.
 * @returns {boolean} true, если год високосный, иначе false.
 */
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Вычисляет факториал числа n (n!).
 * Возвращаемое значение имеет тип BigInt.
 *
 * @param {number} n Неотрицательное целое число.
 * @returns {BigInt} Факториал числа n.
 * @throws {Error} Если n - отрицательное число.
 */
function factorial(n) {
  if (n < 0) {
    throw new Error("Факториал не определен для отрицательных чисел.");
  }
  if (n === 0) {
    return 1n;
  }
  return BigInt(n) * factorial(n - 1);
}

/**
 * Возвращает n-е число Фибоначчи.
 * Возвращаемое значение имеет тип BigInt.
 *
 * @param {number} n Индекс числа Фибоначчи (неотрицательное целое число).
 * @returns {BigInt|NaN} n-е число Фибоначчи. NaN if input is invalid.
 */
export function fib(n) { // Added "export"
  if (n < 0 || !Number.isInteger(n)) {
      console.warn("fib: n должно быть неотрицательным целым числом.");
      return NaN;
  }
  if (n === 0) {
    return 0n;
  }
  if (n === 1) {
    return 1n;
  }

  let a = 0n;
  let b = 1n;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

/**
 * Принимает целочисленное значение x и возвращает анонимную функцию.
 *
 * @param {number} x Целочисленное значение для сравнения.
 * @returns {function(number): (boolean|null)} Анонимная функция.
 */
function compare(x) {
  return function(y) {
    if (y > x) {
      return true;
    } else if (y < x) {
      return false;
    } else {
      return null;
    }
  };
}

/**
 * Возвращает сумму всех своих аргументов.
 *
 * @param {...number} args Числа для суммирования.
 * @returns {number} Сумма всех аргументов.
 */
function sum(...args) {
  if (args.length === 0) {
    return 0;
  }
  return args.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/**
 * Принимает на вход объект и добавляет к нему символьное свойство blackSpot=true.
 *
 * @param {object} obj Объект, к которому добавляется свойство.
 * @returns {object} Модифицированный объект.
 */
function addBlackSpot(obj) {
  const blackSpotSymbol = Symbol.for("blackSpot");
  obj[blackSpotSymbol] = true;
  return obj;
}
