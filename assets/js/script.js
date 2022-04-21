
// add droplet sidebar droplets
let sidebar = document.getElementById("drop_sidebar");
let droplet_count = document.querySelectorAll(".slide").length;
for (let i = 0; i < droplet_count; i++) {
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

	// update number
	let number_elem = elem.getElementsByClassName("number")[0];
	number_elem.textContent = `${anim_value}%`;

	// make text visible when number finished animation
	if (anim_value == value) {
		for (let text_elem of elem.getElementsByClassName("hidden")) {
			text_elem.classList.remove("hidden");
		}
	}
}

// scrollama functionality for generic slide rendering
const slide_scroller = scrollama()
	.setup({
		step: ".slide",
		progress: true
	})
	.onStepEnter(r => {
		// update background
		update_background(r.index);

		// update sidebar droplets
		update_sidebar(r.index);

		switch (r.index) {
			// play typewriter animation
			case 4:
				let h2 = r.element.querySelector(".typewriter h2");
				h2.style.animationPlayState = "running";
				break;
		}
	})
	.onStepProgress(r => {

		switch (r.index) {
			// front page
			case 0:
				// show waterdroplet
				document.getElementById("first-waterdrop").classList.remove("hidden");

				// turn waterdroplet blue: gradually turn rgb(191, 191, 191) into rgb(0, 57, 79)
				let waterdroplet = document.querySelector("#first-waterdrop path");
				let gradient = new_col => 191 - Math.min(r.progress / .5, 1) * (191 - new_col);
				waterdroplet.style.fill = `rgb(${gradient(0)}, ${gradient(57)}, ${gradient(79)})`;
				break;

			// second slide animation
			case 1:
				scroll_number(r.progress, 0.33, 40, r.element);

				// hide front page waterdroplet
				document.getElementById("first-waterdrop").classList.add("hidden");

				break;

			// fourth slide animation
			case 3:
				scroll_number(r.progress, 0.33, 39, r.element);
				break;

			// sixth slide animation
			case 5:
				let anim_progress = Math.min(r.progress / .75, 1);
				// put progress thru sigmoid function for ease-in-out smoothing effect
				// 1 / (1 + e^(-1 * (x - .5) / .1))    (slope of 0.1)
				anim_progress = 1 / (1 + Math.E ** (-(anim_progress - .5) / .1));
				console.log(anim_progress);

				// animate trash bag
				let rotation = `translateX(-20vw) rotateZ(${anim_progress * 90 - 90}deg)`;
				document.getElementById("trashbag").style.transform = rotation;

				// animate trash can lid
				let lid_rotation = `rotateZ(${Math.sin(anim_progress * Math.PI) * 50}deg)`;
				document.querySelector("#trashcan path:nth-child(1)").style.transform = lid_rotation;
				break;
		}

	})