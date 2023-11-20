const spoilersArray = document.querySelectorAll("[data-spoilers]");
if (spoilersArray.length > 0) {
	const spoilersRegular = Array.from(spoilersArray).filter((item) => {
		return !item.dataset.spoilers.split(",")[0];
	});
	
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}
	
	const spoilersMedia = Array.from(spoilersArray).filter((item) => {
		return item.dataset.spoilers.split(",")[0];
	});

	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];
		[].forEach.call(spoilersMedia, (item) => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		let mediaQueries = breakpointsArray.map((item) => {
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});

		[].forEach.call(mediaQueries, (breakpoint) => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			const spoilersArray = breakpointsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			matchMedia.addListener(() => {
				initSpoilers(spoilersArray, matchMedia);
			});

			initSpoilers(spoilersArray, matchMedia);
		});
	}

	function initSpoilers(spoilersArray, matchMedia = false) {
		[].forEach.call(spoilersArray, (spoilersBlock) => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add("_init");
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove("_init");
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		});
	}

	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
		if (spoilerTitles.length > 0) {
			[].forEach.call(spoilerTitles, (sp) => {
				if (hideSpoilerBody) {
					sp.removeAttribute("tabindex");
					if (!sp.classList.contains("_active")) {
						sp.nextElementSibling.hidden = true;
					}
				} else {
					sp.setAttribute("tabindex", "-1")
					sp.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute("data-spoiler") || el.closest("[data-spoiler]")) {
			const spoilerTitle = el.hasAttribute("data-spoiler") ? el : el.closest("[data-spoiler]");
			const spoilersBlock = spoilerTitle.closest("[data-spoilers]");
			const accordeon = spoilersBlock.hasAttribute("data-accordeon") ? true : false;
			if (!spoilersBlock.querySelectorAll("._slide").length) {
				if (accordeon && !spoilerTitle.classList.contains("_active")) {
					hideSpoilersBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle("_active");
				_slideToggle(spoilerTitle.nextElementSibling, spoilerTitle);
			}
			e.preventDefault();
		}
	}

	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector("[data-spoiler]._active");
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove("_active");
			_slideUp(spoilerActiveTitle.nextElementSibling, spoilerActiveTitle);
		}
	}
}