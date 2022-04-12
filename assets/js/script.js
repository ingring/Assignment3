
// add droplet sidebar droplets
let sidebar = document.getElementById("drop_sidebar");
for (let i = 0; i < 6; i++) {
	sidebar.innerHTML += `<img src="assets/img/waterdrops/white.png" alt="" class="droplet">`;
}

// add droplets to droplet- animated scenes
for (let droplet_scene of document.getElementsByClassName("droplet_scene")) {
	for (let i = 0; i < 15; i++) {
		// random delay from 0 to 5 sec
		let delay = Math.floor(Math.random() * 5000);
		// random start position from 5 to 90vw
		let x = Math.floor(Math.random() * 85) + 5;
		droplet_scene.innerHTML += `<img style="margin-left: ${x}vw; animation-delay: ${delay}ms;" src="assets/img/waterdrops/white.png" alt="">`;
	}
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
			droplet.classList.add("hidden");
		}
		else {
			droplet.classList.remove("hidden");
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

function scroll_number(progress, final_progress, value, elem) {
	// update a scroll-progress dependant number using scrollama

	// the animated display-number
	let anim_value = Math.floor(Math.min(progress / final_progress, 1) * value);
	// space-pad the number (requires html white space to not collapse)
	// anim_value = anim_value.toString().padStart(2);

	// update number
	let number_elem = elem.getElementsByClassName("number")[0];
	number_elem.textContent = `${anim_value}%`;
}

// scrollama functionality for generic slide rendering
const slide_scroller = scrollama()
	.setup({
		step: ".slide",
		progress: true
	})
	.onStepEnter(r => {
		let slide_index = r.element.dataset.slide;

		// update background
		update_background(slide_index);

		// update sidebar droplets
		update_sidebar(slide_index);
	})
	.onStepProgress(r => {

		switch (r.index) {
			// first slide animation
			case 0:
				scroll_number(r.progress, 0.33, 40, r.element);
				break;

			// third slide animation
			case 2:
				scroll_number(r.progress, 0.33, 39, r.element);
				break;
		}
	})