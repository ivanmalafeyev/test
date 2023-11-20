import Swiper from "swiper/bundle";

const swiper = new Swiper(".block-slider__swiper", {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
	},
	//autoHeight: true,
	slidesPerView: 2.6,
	spaceBetween: 15,

	preloadImages: false,
	lazy: {
		loadOnTransitionStart: true,
		loadPrevNext: false,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
	}
});