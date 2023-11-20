/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	//Проверка поддержки webp
	function testWebp(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebp(function(support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	})
}

// Menu popup sliding ----------------------------------------------------------------------
export const _slideUp = (target, pauseTarget = null, duration = 500) => {
	if (pauseTarget) {
	  pauseTarget.style.pointerEvents = "none";
	}
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = target.offsetHeight + "px";
	target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	setTimeout(() => {
	  target.style.display = "none";
	  target.style.removeProperty("height");
	  target.style.removeProperty("padding-top");
	  target.style.removeProperty("padding-bottom");
	  target.style.removeProperty("margin-top");
	  target.style.removeProperty("margin-bottom");
	  target.style.removeProperty("overflow");
	  target.style.removeProperty("transition-property");
	  target.style.removeProperty("transition-duration");
	  target.classList.remove("_slide");
	  if (pauseTarget) {
		 pauseTarget.style.pointerEvents = "all";
	  }
	}, duration);
 };
 
 export const _slideDown = (target, pauseTarget = null, duration = 500) => {
	if (pauseTarget) {
	  pauseTarget.style.pointerEvents = "none";
	}
	target.style.removeProperty("display");
	let display = window.getComputedStyle(target).display;
	if (display === "none") {
	  display = "block";
	}
 
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	target.style.removeProperty("padding-top");
	target.style.removeProperty("padding-bottom");
	target.style.removeProperty("margin-top");
	target.style.removeProperty("margin-bottom");
	setTimeout(() => {
	  target.style.removeProperty("height");
	  target.style.removeProperty("overflow");
	  target.style.removeProperty("transition-property");
	  target.style.removeProperty("transition-duration");
	  target.classList.remove("_slide");
	  if (pauseTarget) {
		 pauseTarget.style.pointerEvents = "all";
	  }
	}, duration);
 };
 
 export async function _slideToggle (target, pauseTarget = null, duration = 500) {
	if (!target.classList.contains("_slide")) {
	  target.classList.add("_slide");
	  if (window.getComputedStyle(target).display === "none") {
		return _slideDown(target, pauseTarget, duration);
	  } else {
		return _slideUp(target, pauseTarget, duration);
	  }
	}
 };
