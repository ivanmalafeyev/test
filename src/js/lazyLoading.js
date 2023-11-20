const lazyImages = document.querySelectorAll("img[data-src],source[data-srcset]");
const loadMapBlock = document.querySelector("._load-map");
const windowHeight = document.documentElement.clientHeight;
const loadMoreBlock = document.querySelector("._load-more");

let lazyImagesPositions = [];
if (lazyImages.length > 0) {
	[].forEach.call(lazyImages, (img) => {
		if (img.dataset.src || img.dataset.srcset) {
			lazyImagesPositions.push(img.getBoundingClientRect().top + pageYOffset);
			lazyScrollCheck();
		}
	});
}

window.addEventListener("scroll", lazyScroll);

function lazyScroll() {
	if (document.querySelectorAll("img[data-src],source[data-srcset]").length > 0) {
		lazyScrollCheck();
	}
	if (loadMapBlock && !loadMapBlock.classList.contains("_loaded")) {
		getMap();
	}
	if (loadMoreBlock && !loadMoreBlock.classList.contains("_loading")) {
		loadMore();
	}
}

function lazyScrollCheck() {
	let imgIndex = lazyImagesPositions.findIndex(
		item => pageYOffset > item - windowHeight
	);
	if (imgIndex >= 0) {
		if (lazyImages[imgIndex].dataset.src) {
			lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
			lazyImages[imgIndex].removeAttribute('data-src');
		} else if (lazyImages[imgIndex].dataset.srcset) {
			lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
			lazyImages[imgIndex].removeAttribute('data-srcset');
		}
		delete lazyImagesPositions[imgIndex];
	}
}

async function getMap() {
	const loadMapBlockPos = loadMapBlock.getBoundingClientRect().top + pageYOffset;
	if (pageYOffset > loadMapBlockPos - windowHeight) {
		//const loadMapURL = loadMapBlock.dataset.map;
		//if (loadMapURL) {
			/*loadMapBlock.insertAdjacentHTML(
				"beforeend",
				`<iframe src="${loadMapURL}" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
			);*/
			console.log("start");
			await loadMap();
			console.log("finish");
			loadMapBlock.classList.add("_loaded");
		//}
	}
}

const LOCATION = {center: [37.623082, 55.75254], zoom: 9};
window.map = null;

async function loadMap() {
	await ymaps3.ready;
	const {YMap, YMapDefaultSchemeLayer, YMapControls} = ymaps3;
 
	const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
 
	map = new YMap(document.getElementById('_ymap'), {location: LOCATION}, [
	  new YMapDefaultSchemeLayer(),
	  new YMapControls({position: 'right'}, [new YMapZoomControl({})])
	]);
 } 

function loadMore() {
	const loadMoreBlockPos = loadMoreBlock.getBoundingClientRect().top + pageYOffset;
	const loadMoreBlockHeight = loadMoreBlock.offsetHeight;
	if (pageYOffset > loadMoreBlockPos + loadMoreBlockHeight - windowHeight) {
		getContent();
	}
}

async function getContent() {
	if (!loadMoreBlock.querySelector("._loading-icon")) {
		loadMoreBlock.insertAdjacentHTML(
			"beforeend",
			`<div class="_loading-icon"></div>`
		);
	}
	loadMoreBlock.classList.add("._loading");

	let response = await fetch("_more.html", {
		method: "GET",
	});

	if (response.ok) {
		let result = await response.text();
		loadMoreBlock.insertAdjacentHTML(
			"beforeend",
			result
		);
		loadMoreBlock.classList.remove("._loading");
		if (loadMoreBlock.querySelector("._loading-icon")) {
			loadMoreBlock.querySelector("._loading-icon").remove();
		}		
	} else {
		alert("Ошибка передачи данных");
	}
}