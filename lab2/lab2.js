// lab2.js

/**
 * Возвращает x в степени n.
 *
 * @param {number} x Основание.
 * @param {number} n Экспонента (целое число).
 * @returns {number} x в степени n.
 * @example
 * pow(2, 2) // => 4
 * pow(2, 0) // => 1
 * pow(2, -2) // => 0.25
 */
function pow(x, n) {
  if (n === 0) {
    return 1;
  }
  // Для отрицательных степеней используем Math.pow, 
  // т.к. он корректно обрабатывает 1 / (x ^ abs(n))
  // Для положительных можно было бы сделать цикл, но Math.pow эффективнее
  return Math.pow(x, n);
}

/**
 * Вычисляет сумму чисел от 1 до n включительно.
 * Эта функция создается с помощью конструктора `new Function`.
 *
 * @param {number} n Натуральное число, до которого вычисляется сумма.
 * @returns {number} Сумма чисел от 1 до n.
 * @example
 * sumTo(100) // => 5050
 * sumTo(1) // => 1
 */
const sumTo = new Function('n', `
  if (n < 1 || !Number.isInteger(n)) {
    // Хотя в условии "натуральное n", добавим проверку
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
 * Год високосный, если он кратен 400, или если он кратен 4, но не кратен 100.
 *
 * @param {number} year Год для проверки.
 * @returns {boolean} true, если год високосный, иначе false.
 * @example
 * isLeapYear(2024) // => true
 * isLeapYear(2025) // => false
 * isLeapYear(2000) // => true
 * isLeapYear(1900) // => false
 */
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Вычисляет факториал числа n (n!).
 * Использует рекурсивный вызов. Возвращаемое значение имеет тип BigInt.
 *
 * @param {number} n Неотрицательное целое число.
 * @returns {BigInt} Факториал числа n.
 * @throws {Error} Если n - отрицательное число.
 * @example
 * factorial(0) // => 1n
 * factorial(5) // => 120n
 */
function factorial(n) {
  if (n < 0) {
    throw new Error("Факториал не определен для отрицательных чисел.");
  }
  if (n === 0) {
    return 1n; // BigInt literal
  }
  // Убедимся, что n - это BigInt для умножения
  return BigInt(n) * factorial(n - 1);
}

/**
 * Возвращает n-е число Фибоначчи.
 * Возвращаемое значение имеет тип BigInt.
 * Используется итеративный подход для эффективности.
 * F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.
 *
 * @param {number} n Индекс числа Фибоначчи (неотрицательное целое число).
 * @returns {BigInt} n-е число Фибоначчи.
 * @example
 * fib(0) // => 0n
 * fib(1) // => 1n
 * fib(2) // => 1n
 * fib(10) // => 55n
 * fib(100) // => 354224848179261915075n
 */
function fib(n) {
  if (n < 0 || !Number.isInteger(n)) {
      // Хотя в задаче не указано, что делать с нецелыми или отрицательными n,
      // для чисел Фибоначчи обычно рассматриваются неотрицательные целые.
      console.warn("fib: n должно быть неотрицательным целым числом.");
      return NaN; // Или throw new Error()
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
 * Анонимная функция принимает целочисленное значение y и сравнивает y с x.
 *
 * @param {number} x Целочисленное значение для сравнения.
 * @returns {function(number): (boolean|null)}
 *   Анонимная функция, которая:
 *   - принимает {number} y
 *   - возвращает {true} если y > x
 *   - возвращает {false} если y < x
 *   - возвращает {null} если y === x
 * @example
 * const compareWith5 = compare(5);
 * compareWith5(4) // => false
 * compareWith5(5) // => null
 * compareWith5(6) // => true
 */
function compare(x) {
  return function(y) {
    if (y > x) {
      return true;
    } else if (y < x) {
      return false;
    } else { // y === x
      return null;
    }
  };
}

/**
 * Возвращает сумму всех своих аргументов.
 *
 * @param {...number} args Числа для суммирования.
 * @returns {number} Сумма всех аргументов. Если аргументов нет, возвращает 0.
 * @example
 * sum() // => 0
 * sum(1) // => 1
 * sum(1, 2) // => 3
 * sum(1, 2, 3, 4) // => 10
 */
function sum(...args) {
  if (args.length === 0) {
    return 0;
  }
  return args.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/**
 * Принимает на вход объект и добавляет к нему символьное свойство blackSpot=true.
 * Символ 'blackSpot' берется из глобального реестра символов.
 *
 * @param {object} obj Объект, к которому добавляется свойство.
 * @returns {object} Модифицированный объект с добавленным символьным свойством.
 * @example
 * const myObj = {};
 * addBlackSpot(myObj);
 * // myObj теперь имеет свойство Symbol.for("blackSpot") равное true
 * // console.log(myObj[Symbol.for("blackSpot")]); // => true
 * addBlackSpot({}) // => {[Symbol.for("blackSpot")]: true} (условно, т.к. вывод символа специфичен)
 */
function addBlackSpot(obj) {
  const blackSpotSymbol = Symbol.for("blackSpot");
  obj[blackSpotSymbol] = true;
  return obj;
}
