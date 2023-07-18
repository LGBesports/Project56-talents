function addTimestampToCSS() {
    var cssFiles = [
        "./css/style.css",
        "./css/media.css"
    ];

    var timestamp = new Date().getTime();

    cssFiles.forEach(function (cssFile) {
        var linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = cssFile + "?v=" + timestamp;
        document.head.appendChild(linkElement);
    });
}
var questions = document.getElementsByClassName('question');
var answers = document.getElementsByClassName('answer');

for (var i = 0; i < questions.length; i++) {
    questions[i].addEventListener('click', toggleAnswer.bind(null, i));
}

function toggleAnswer(index) {
    var answer = answers[index];
    var isVisible = answer.classList.contains('visible');

    hideAllAnswers();

    if (!isVisible) {
        answer.classList.add('visible');
    }
}

function hideAllAnswers() {
    for (var i = 0; i < answers.length; i++) {
        answers[i].classList.remove('visible');
    }
}

addTimestampToCSS();

let center = [45.054747563133034, 37.124260537664355];

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [59.94, 30.32], // координаты центра Санкт-Петербурга
        zoom: 10
    });

    var myPlacemark = new ymaps.Placemark([59.94, 30.32], {}, {
        preset: 'islands#icon',
        iconColor: '#0095b6'
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
}
gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll("a[href^='#']").forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        gsap.to(window, { scrollTo: this.getAttribute("href"), duration: 1 });
    });
});
window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('.tel'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ __-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

});


// Получение всех элементов с классом "popaction"
var popactions = document.querySelectorAll('.popaction');
var close = document.querySelector('.close');
var openburger = document.querySelector('.openburger');
var closeburger = document.querySelector('.closeburger');
var body = document.body;
var popup = document.querySelector('.popup');
var menu = document.querySelector('.menu');
// Применение обработчика событий ко всем элементам с классом "popaction"
for (var i = 0; i < popactions.length; i++) {
    popactions[i].addEventListener('click', function () {
        // Использование GSAP для установки свойств "popup"
        gsap.set(popup, {
            className: "section form popup active",
            top: window.pageYOffset + "px",
            left: window.pageXOffset + "px"
        });
        // Добавление свойства "overflow: hidden" к элементу "body"
        body.style.overflow = 'hidden';
        // Отключение плавной прокрутки

    });
}

// Добавление обработчика события при нажатии на кнопку "close"
close.addEventListener('click', function () {
    // Использование GSAP для удаления класса "active" у элемента "popup"
    gsap.set(popup, { className: "section form popup" });
    // Удаление свойства "overflow: hidden" у элементу "body"
    body.style.overflow = '';
    // Включение плавной прокрутки

});

// Добавление обработчика события при клике на элемент с классом "openburger"
openburger.addEventListener('click', function () {
    // Использование GSAP для установки свойств "menu"
    gsap.set(menu, {
        className: "menu active",
        top: window.pageYOffset + "px",
        left: window.pageXOffset + "px"
    });
    body.style.overflow = 'hidden';
});

// Добавление обработчика события при клике на элемент с классом "closeburger"
closeburger.addEventListener('click', function () {
    // Использование GSAP для удаления класса "active" у элемента "menu"
    gsap.set(menu, { className: "menu" });
    // Использование GSAP для изменения позиции элемента "menu"
    gsap.to(menu, { left: "-100%" });
    body.style.overflow = '';
});
function toggleExtraPosition() {
    if (window.innerWidth <= 769) {
        gsap.to('.extra', {
            position: 'fixed',
            bottom: '20px'
        });
    } else {
        return;
    }
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('DOMContentLoaded', toggleExtraPosition);
window.addEventListener('load', toggleExtraPosition);