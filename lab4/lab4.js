'use strict';

class Book {
    // 1. Объявляем настоящие приватные поля с помощью #
    #title;
    #pubYear;
    #price;

    constructor(title, pubYear, price) {
        // Присваивание через сеттеры, которые теперь работают с приватными полями
        this.title = title;
        this.pubYear = pubYear;
        this.price = price;
    }

    get title() {
        return this.#title; // 2. Используем # для доступа к приватным полям
    }

    set title(text) {
        if (typeof text !== 'string' || text.trim() === '') {
            throw new Error('Title must be a non-empty string.');
        }
        this.#title = text.trim(); // 2. Используем # для записи в приватные поля
    }

    get pubYear() {
        return this.#pubYear;
    }

    set pubYear(newPubYear) {
        if (typeof newPubYear !== 'number' || newPubYear <= 0 || !Number.isInteger(newPubYear)) {
            throw new Error('pubYear must be a positive integer.');
        }
        this.#pubYear = newPubYear;
    }

    get price() {
        return this.#price;
    }

    set price(newPrice) {
        if (typeof newPrice !== 'number' || newPrice <= 0) {
            throw new Error('Price must be a positive number.');
        }
        this.#price = newPrice;
    }

    show() {
        // 3. В методах класса также используем # для доступа к данным
        console.log(`Название: ${this.#title},
Год публикации: ${this.#pubYear},
Цена: ${this.#price}`);
    }

    static compare(book1, book2) {
        // Статический метод работает с публичными геттерами, тут изменений нет
        return book1.pubYear - book2.pubYear;
    }
}

/**
 * Форматирует объект Date в строку в формате YYYY-MM-DD.
 * Это гарантирует одинаковый вывод независимо от языковых настроек системы.
 * @param {Date} date - Объект Date, который нужно отформатировать
 * @returns {string} Строка с датой в формате YYYY-MM-DD
 */
function formatDate(date) {
    // Получаем компоненты даты
    const year = date.getFullYear();
    // Месяцы в JavaScript начинаются с 0 (январь = 0), поэтому добавляем 1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Собираем дату в формате YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

try {
    let book1 = new Book('1984', 1949, 1000);
    book1.show();
    book1.price = 1900;
    book1.show();

    console.log("Цена book1:", book1.price);

    let book2 = new Book('To Kill a Mockingbird', 1960, 890);
    book2.show();
    let book3 = new Book('1984', 1949, 250);
    book3.show();

    let books = [book1, book2, book3];
    books.sort(Book.compare);
    console.log("Книги после сортировки по году издания:");
    for (let i = 0; i < books.length; ++i) {
        books[i].show();
    }

    function isEmpty(obj) {
        if (typeof obj !== 'object' || obj === null) return true;

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return Object.getOwnPropertySymbols(obj).length === 0;
    }

    let obj1 = { [Symbol()]: true };
    let obj2 = {};

    console.log("Объект 1", isEmpty(obj1));
    console.log("Объект 2", isEmpty(obj2));

    let classObject = {
        className: "open menu",

        addClass(cls) {
            let classes = this.className.split(' ');
            if (!classes.includes(cls)) {
                this.className += " " + cls;
            }
            return this;
        },

        removeClass(cls) {
            let classes = this.className.split(' ');
            let index = classes.indexOf(cls);
            if (index !== -1) {
                classes.splice(index, 1);
                this.className = classes.join(' ');
            }
        }
    };

    classObject.addClass('close');
    console.log("className после addClass('close'):", classObject.className);

    classObject.addClass('open');
    console.log("className после addClass('open'):", classObject.className);

    classObject.removeClass('menu');
    console.log("className после removeClass('menu'):", classObject.className);

    let jsonString = JSON.stringify(classObject, null, 2);
    console.log("JSON строка:", jsonString);

    let object2 = JSON.parse(jsonString);
    console.log('Сравнение объектов из JSON:', JSON.stringify(object2) === JSON.stringify(classObject));

    function getSecondsToday() {
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return Math.floor((now - start) / 1000); 
    }

    console.log("Секунд с начала дня: ", getSecondsToday());

    let date1 = new Date(2024, 0, 20); 
    let date2 = new Date(2000, 11, 1); 
    let date3 = new Date(1995, 9, 10); 

    console.log("Дата 1:", formatDate(date1));  // 2024-01-20
    console.log("Дата 2:", formatDate(date2));  // 2000-12-01
    console.log("Дата 3:", formatDate(date3));  // 1995-10-10
} catch (error) {
    console.error("Произошла ошибка:", error.message);
}
