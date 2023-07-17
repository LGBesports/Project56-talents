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


const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 63,
    loop: true,
    on: {
        slideChange: function () {
            let slides = this.slides;
            slides.forEach(slide => {
                slide.classList.remove('lefter', 'righter');
            });

            let activeIndex = this.activeIndex;

            if (this.isBeginning) {
                slides[activeIndex + 1].classList.add('righter');
            } else if (this.isEnd) {
                slides[activeIndex - 1].classList.add('lefter');
            } else {
                slides[activeIndex - 1].classList.add('lefter');
                slides[activeIndex + 1].classList.add('righter');
            }
        },
    },
});

document.getElementById('rightbutton').addEventListener('click', () => {
    swiper.slideNext();
});

document.getElementById('leftbutton').addEventListener('click', () => {
    swiper.slidePrev();
});
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
