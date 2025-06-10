// lab2.js

/**
 * Возводит x в степень n.
 * @param {number} x - Основание.
 * @param {number} n - Целочисленный показатель степени.
 * @returns {number} Результат возведения x в степень n.
 */
function pow(x, n) {
  return x ** n;
}

/**
 * Вычисляет сумму чисел от 1 до n включительно.
 * Функция создана с использованием 'new Function'.
 * @param {number} n - Натуральное число, до которого вычисляется сумма.
 * @returns {number} Сумма чисел от 1 до n.
 */
const sumTo = new Function('n', 
  // Используем формулу арифметической прогрессии для эффективности
  if (n < 1) return 0;
  return n * (n + 1) / 2;
);

/**
 * Проверяет, является ли год високосным.
 * Год является високосным, если он кратен 400, или если он кратен 4, но не кратен 100.
 * @param {number} year - Год для проверки.
 * @returns {boolean} true, если год високосный, иначе false.
 */
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Вычисляет факториал числа n с использованием рекурсии.
 * @param {number} n - Неотрицательное целое число.
 * @returns {BigInt} Факториал числа n.
 */
function factorial(n) {
  if (n < 0) {
    throw new Error("Факториал определен только для неотрицательных чисел.");
  }
  if (n === 0) {
    return 1n; // Базовый случай рекурсии, возвращаем BigInt
  }
  // n! = n * (n-1)!
  // BigInt() необходим для преобразования n в тип BigInt для умножения
  return BigInt(n) * factorial(n - 1);
}

/**
 * Находит n-е число Фибоначчи.
 * Использует итеративный подход для производительности.
 * @param {number} n - Порядковый номер числа Фибоначчи (начиная с 0).
 * @returns {BigInt} n-е число Фибоначчи.
 */
function fib(n) {
  if (n < 0) {
    throw new Error("Числа Фибоначчи не определены для отрицательных индексов.");
  }
  if (n === 0) return 0n;

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
 * Возвращает функцию-компаратор, которая сравнивает свой аргумент с заданным числом x.
 * @param {number} x - Число, с которым будет происходить сравнение.
 * @returns {function(number): (boolean|null)} Анонимная функция, принимающая y.
 *   - Возвращает true, если y > x.
 *   - Возвращает false, если y < x.
 *   - Возвращает null, если y === x.
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
 * Возвращает сумму всех переданных аргументов.
 * @param {...number} args - Числа для суммирования.
 * @returns {number} Сумма всех аргументов.
 */
function sum(...args) {
  // Используем reduce для суммирования. Начальное значение 0, чтобы sum() вернул 0.
  return args.reduce((total, current) => total + current, 0);
}

/**
 * Добавляет в объект символьное свойство [Symbol.for("blackSpot")] со значением true.
 * @param {object} obj - Объект, который нужно изменить.
 * @returns {object} Тот же объект с добавленным свойством.
 */
function addBlackSpot(obj) {
  const blackSpotSymbol = Symbol.for("blackSpot");
  obj[blackSpotSymbol] = true;
  return obj;
}
