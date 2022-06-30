import "../scss/style.scss"
import * as functions from "./core/utils/functions.js"
import * as forms from "./core/forms/forms.js"
import "./core/forms/select.js"
import "./core/utils/sliders.js"
import { isTarget, removeClasses, bodyLockStatus, bodyLockToggle, _slideUp } from './core/utils/functions.js';
import { playFirstScene, playPreloaderAnimation, ScrollObserver } from './core/utils/animation.js';

const clickOnDocument = (e) => {
	const targetElement = e.target;

	const $targetHeaderSpoller = isTarget(targetElement, '.header [data-spoller]')
	if (!$targetHeaderSpoller) {
		removeClasses('.header [data-spoller]', '_spoller-active')
		_slideUp('.header [data-spoller] + *', 500);
	}

	const $pageBurger = isTarget(targetElement, '[data-burger]')
	const $headerMenu = document.querySelector('[data-mobile-menu]')
	if ($pageBurger && $headerMenu) {
		if (bodyLockStatus) {
			bodyLockToggle();
			$headerMenu.classList.toggle('js-open');
			$pageBurger.classList.toggle('js-open');
		}
	}
};

const initSvgAnimation = () => {
	const scene = document.querySelector('#scene_1');
	scene && playFirstScene(scene);
};

const initPreloader = () => {
	playPreloaderAnimation();
}

const initScrollAnimation = () => {
	const scrollElements = document.querySelectorAll('[data-scroll], [data-fromLeft], [data-fromRight]');

	const isView = (el) => {
    	!el.classList.contains('is-view') ? el.classList.add('is-view') : null
	}
	
	new ScrollObserver(scrollElements, isView, null, {})
}

const init = () => {
	window.scrollTo({
		top: 0
	})
	initPreloader();
	
	const $html = document.documentElement;
	$html.classList.add('loaded');
	
	initScrollAnimation();
	
	inlineSVG.init({ svgSelector: '[data-inline-svg]'});
	functions.spollers();
	forms.formFieldsInit()
	forms.formSubmit(true)
	
	document.addEventListener('click', clickOnDocument)
};


window.addEventListener('load', init);