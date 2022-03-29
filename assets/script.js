
// add droplet sidebar droplets
let sidebar = document.getElementById("drop_sidebar");
for (let i = 0; i < 9; i++) {
	sidebar.innerHTML += `<img src="storyboard/img/waterdrops/white.png" alt="" class="droplet">`;
}

function update_sidebar(active_droplet) {
	let droplets = document.querySelectorAll("#drop_sidebar .droplet");
	// iterate waterdroplets
	for (let [i, droplet] of Object.entries(droplets)) {

		if (i == active_droplet) {
			// add ".active" to droplet
			droplet.classList.add("active");
		}
		else {
			droplet.classList.remove("active");
		}

		if (i < active_droplet) {
			// add ".hidden" to droplet
			droplet.classList.add("hidden")
		}
		else {
			droplet.classList.remove("hidden")
		}
	}
}

function update_background(slide) {
	let images = document.querySelectorAll("#front .background");
	// iterate backgrounds
	for (let [i, bg] of Object.entries(images)) {
		if (i == slide) {
			// add ".active" to background
			bg.classList.add("active");
		}
		else {
			bg.classList.remove("active");
		}
	}
}

const observer = new IntersectionObserver(
	function (entries, observer) {
		entries.forEach((entry) => {

			if (entry.isIntersecting) {
				// observer.unobserve(entry.target);

				// log what slide number this is
				let slide_index = entry.target.getAttribute("data-slide");
				console.log(slide_index);

				// update background
				update_background(slide_index);

				// update sidebar droplets
				update_sidebar(slide_index);

			}

		});
	}, 
	{
		treshold: 0,
		rootMargin: "-250px"
	}
);

// observer.observe(document.querySelector(".slide"));
for (let slide of document.getElementsByClassName("slide")) {
	observer.observe(slide);
}