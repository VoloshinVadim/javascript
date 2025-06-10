/**
 * Возводит x в степень n.
 *
 * @param {number} x Число, которое нужно возвести в степень.
 * @param {number} n Целочисленный показатель степени.
 * @returns {number} Результат возведения x в степень n.
 */
function pow(x, n) {
  return x ** n;
}

/**
 * Вычисляет сумму чисел от 1 до n включительно.
 * Эта функция создана с использованием конструктора "new Function".
 *
 * @param {number} n Натуральное число, до которого ведется суммирование.
 * @returns {number} Сумма чисел от 1 до n.
 */
const sumTo = new Function('n', 
  if (n < 1) return 0;
  // Используем арифметическую прогрессию для эффективности
  return n * (n + 1) / 2;
);

/**
 * Проверяет, является ли год високосным.
 * Год високосный, если он кратен 400, или если он кратен 4, но не кратен 100.
 *
 * @param {number} year Год для проверки.
 * @returns {boolean} true, если год високосный, иначе false.
 */
function isLeapYear(year) {
  return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * Вычисляет факториал числа n с использованием рекурсии.
 *
 * @param {number} n Неотрицательное целое число.
 * @returns {BigInt} Факториал числа n.
 */
function factorial(n) {
  if (n < 0) {
    throw new Error("Факториал определен только для неотрицательных чисел");
  }
  if (n === 0) {
    return 1n;
  }
  // Преобразуем n в BigInt для умножения
  return BigInt(n) * factorial(n - 1);
}

/**
 * Вычисляет n-е число Фибоначчи с использованием итеративного подхода.
 *
 * @param {number} n Порядковый номер числа Фибоначчи (начиная с 0).
 * @returns {BigInt} n-е число Фибоначчи.
 */
function fib(n) {
  if (n < 0) {
      throw new Error("Числа Фибоначчи определены для неотрицательных n");
  }
  if (n === 0) return 0n;

  let a = 0n;
  let b = 1n;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

/**
 * Возвращает функцию-замыкание для сравнения чисел.
 *
 * @param {number} x Число для сравнения.
 * @returns {function(number): (boolean|null)} Анонимная функция, которая принимает y
 * и возвращает true, если y > x; false, если y < x; и null, если y === x.
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
 *
 * @param {...number} args Числа для суммирования.
 * @returns {number} Сумма всех аргументов.
 */
function sum(...args) {
  return args.reduce((total, current) => total + current, 0);
}

/**
 * Добавляет к объекту символьное свойство "blackSpot" из глобального реестра.
 *
 * @param {object} obj Объект, к которому нужно добавить свойство.
 * @returns {object} Тот же объект с добавленным свойством.
 */
function addBlackSpot(obj) {
  const blackSpotSymbol = Symbol.for("blackSpot");
  obj[blackSpotSymbol] = true;
  return obj;
}
