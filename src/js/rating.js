const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
	initRatings();
}

function initRatings() {
	let ratingActive, ratingValue;
	[].forEach.call(ratings, (rating) => {
		initRating(rating);
	});

	function initRating(rating) {
		initRatingVars(rating);
		setRatingActiveWidth();

		if (rating.classList.contains("rating_set")) {
			setRating(rating);
		}
	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector(".rating__active");
		ratingValue = rating.querySelector(".rating__value");
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	function setRating(rating) {
		const ratingItems = rating.querySelectorAll(".rating__item");
		[].forEach.call(ratingItems, (ri,ind) => {
			ri.addEventListener("mouseenter", (e) => {
				initRatingVars(rating);
				setRatingActiveWidth(ri.value);
			});
			ri.addEventListener("mouseleave", (e) => {
				setRatingActiveWidth();
			});
			ri.addEventListener("click", (e) => {
				initRatingVars(rating);
				if (rating.dataset.ajax) {
					setRatingValue(ri.value, rating);
				} else {
					ratingValue.innerHTML = ind + 1;
					setRatingActiveWidth();
				}
			});
		});
	}

	async function setRatingValue(value, rating) {
		if (!rating.classList.contains("rating-sending")) {
			rating.classList.add("rating-sending");
			let response = await fetch("files/rating.json", {
				method: "GET",

				//body: JSON.stringify({
				//	userRating: value,
				//}),
				//headers: {
				//	'content-type': 'application/json',
				//},
			});
			if (response.ok) {
				const result = await response.json();
				const newRating = result.newRating;
				ratingValue.innerHTML = newRating;
				setRatingActiveWidth();
			} else {
				alert("Ошибка передачи данных");
			}
			rating.classList.remove("rating-sending");
		}
	}
}

