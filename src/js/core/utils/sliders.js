/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
//import Swiper, { Navigation, Pagination, Lazy } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../../scss/libs/_swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	if (document.querySelector('.slider-main__slider')) {
		const swiper = new Swiper('.slider-main__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 32,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			pagination: {
				el: '.slider-main__counter',
				type: 'fraction',
			},
			navigation: {
				nextEl: '.slider-main__next',
				prevEl: '.slider-main__prev',
				disabledClass: '_disabled'
			}
		});

		const addZero = (str) => +str < 10 ? '0' + str : str;

		const counterCurrent = swiper.el.querySelector('.swiper-pagination-current');
		const counterTotal = swiper.el.querySelector('.swiper-pagination-total');

		const sliderNeedUpdates = () => {
			counterCurrent.innerHTML = addZero(counterCurrent.textContent);
			counterTotal.innerHTML = addZero(counterTotal.textContent);
		}

		sliderNeedUpdates();
		swiper.on('slideChange', sliderNeedUpdates);
	}

	if (document.querySelector('.team-slider__slider')) {
		new Swiper('.team-slider__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 40,
			resizeObserver: true,
			autoHeight: true,
			speed: 800,
			grabCursor: true,
			navigation: {
				nextEl: '.team-slider__next',
				prevEl: '.team-slider__prev',
				disabledClass: '_disabled'
			},
			pagination: {
    			el: '.team-slider__pagination',
    			type: 'bullets',
				clickable: true
  			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				480: {
					slidesPerView: 1.2,
					spaceBetween: 30
				},
				640: {
					slidesPerView: 1.5,
					spaceBetween: 40
				},
				1260: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders()
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});