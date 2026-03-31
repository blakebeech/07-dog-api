// Grab the select element from the page
const breedSelect = document.getElementById("breed-select");
const gallery = document.getElementById("gallery");

// Get all dog breeds from the Dog API
fetch("https://dog.ceo/api/breeds/list/all")
	.then((response) => response.json())
	.then((data) => {
		// data.message is an object, so we use Object.keys to get the breed names
		const breeds = Object.keys(data.message).sort();

		// Create one option element for each breed and add it to the select menu
		breeds.forEach((breed) => {
			const option = document.createElement("option");
			option.value = breed;
			option.textContent = breed;
			breedSelect.appendChild(option);
		});
	});

// When a user selects a breed, fetch and show 9 random images
breedSelect.addEventListener("change", () => {
	const selectedBreed = breedSelect.value;

	// If the placeholder option is selected, clear the gallery
	if (!selectedBreed) {
		gallery.innerHTML = "";
		return;
	}

	fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`)
		.then((response) => response.json())
		.then((data) => {
			gallery.innerHTML = "";

			// data.message is now an array of 9 image URLs
			data.message.forEach((imageUrl, index) => {
				const galleryItem = document.createElement("div");
				galleryItem.className = "gallery-item";

				const dogImage = document.createElement("img");
				dogImage.src = imageUrl;
				dogImage.alt = `${selectedBreed} dog ${index + 1}`;

				galleryItem.appendChild(dogImage);
				gallery.appendChild(galleryItem);
			});
		});
});
