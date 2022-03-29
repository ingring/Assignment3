const backgrounds = [];
for (let i = 2; i <= 10; i++) {
	backgrounds.push(`storyboard/img/background-img/scene${i}.JPEG`);
}

const cover_im = document.getElementById("cover");

const observer = new IntersectionObserver(
	function (entries, observer) {
		entries.forEach((entry) => {

			if (entry.isIntersecting) {
				// console.log(entry.target.innerHTML);
				// observer.unobserve(entry.target);

				// log what slide number this is
				let slide_index = entry.target.getAttribute("data-slide");
				console.log(slide_index);

				// update background
				cover_im.setAttribute("src", backgrounds[slide_index-1]);

			}

		});
	}, 
	{
		treshold: 0,
		rootMargin: "-100px"
	}
);

// observer.observe(document.querySelector(".slide"));
for (let slide of document.getElementsByClassName("slide")) {
	observer.observe(slide);
}