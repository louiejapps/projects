
// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyCIVn6iYuZytcF7BGjRjd5idUVmLfqRO6g",
	authDomain: "quotes-react2.firebaseapp.com",
	databaseURL: "https://quotes-react2-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "quotes-react2",
	storageBucket: "quotes-react2.appspot.com",
	messagingSenderId: "911483163774",
	appId: "1:911483163774:web:e1d24ea42b5c1af58d742f"

};

const loading = document.querySelector("#loading-page");
loading.style.display = "block";




firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();

const autoContent = document.getElementById("autocontent");
const stats = document.getElementById("status");
const showFormButton = document.getElementById("show-image");

// Canvas elements
const mycanvas1 = document.querySelectorAll('#scratch1');
const mycanvas2 = document.querySelectorAll('#scratch2');
const mycanvas3 = document.querySelectorAll('#scratch3');
const mycanvas4 = document.querySelectorAll('#scratch4');
const mycanvas5 = document.querySelectorAll('#scratch5');
const mycanvas6 = document.querySelectorAll('#scratch6');

// Switch container elements
const sc1 = document.getElementById("switch-container1");
const sc2 = document.getElementById("switch-container2");
const sc3 = document.getElementById("switch-container3");
const sc4 = document.getElementById("switch-container4");
const sc5 = document.getElementById("switch-container5");
const sc6 = document.getElementById("switch-container6");

// Switch elements
const switch1 = document.getElementById("switch1");
const switch2 = document.getElementById("switch2");
const switch3 = document.getElementById("switch3");
const switch4 = document.getElementById("switch4");
const switch5 = document.getElementById("switch5");
const switch6 = document.getElementById("switch6");

// Image elements
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const image4 = document.getElementById("image4");
const image5 = document.getElementById("image5");
const image6 = document.getElementById("image6");





var quoteRef = database.ref('proofpay');

// Using once() to retrieve data once
quoteRef.once('value', function (snapshot) {

	var card1R = snapshot.val().card1.isRedeemed;
	var card2R = snapshot.val().card2.isRedeemed;
	var card3R = snapshot.val().card3.isRedeemed;
	var card4R = snapshot.val().card4.isRedeemed;
	var card5R = snapshot.val().card5.isRedeemed;
	var card6R = snapshot.val().card6.isRedeemed;

	scratchcard(mycanvas1, sc1, switch1, image1, card1R);
	scratchcard(mycanvas2, sc2, switch2, image2, card2R);
	scratchcard(mycanvas3, sc3, switch3, image3, card3R);
	scratchcard(mycanvas4, sc4, switch4, image4, card4R);
	scratchcard(mycanvas5, sc5, switch5, image5, card5R);
	scratchcard(mycanvas6, sc6, switch6, image6, card6R);


	var imageData = snapshot.val().image.image;
	var thumbnail = snapshot.val().image.thumbnail;
	var timestamp = snapshot.val().image.timestamp;

	if(imageData===""){
		stats.innerHTML=`STATUS: UNPAID`;
		stats.style.color = `red`;
	}else{
		if(imageData.includes("gcash")){
			stats.innerHTML=`STATUS: PAID`;
			stats.style.color = `green`;
		}else{
			stats.innerHTML=`STATUS: INVALID PAYMENT`;
			stats.style.color = `red`;
		}
	}

	loading.style.display = "none";


	

	showFormButton.addEventListener('click', function () {
		sessionStorage.removeItem("link");
		sessionStorage.removeItem("base64");

		var counter = false;
		var modal = document.createElement('div');

		let dButton = "<br><a class='delete-button'>Delete</a>";
		let inputtf = "<div id='thumbnails'></div>";
		let imgButton = "<input type='file' id='img-button' onchange='handleImage()'   accept='image/*' style='display:none'>";
		let vButton = "<button class='view-button' id='v-button'><h1>+</h1>ADD PHOTO</button><br>";
		let postButton = "<button class='view-button' id='post-button'>POST</button>";
		



		if (imageData === "") {
			modal.innerHTML = "<center><div><p>" + "<h2 style='color:gray;'>" + "Upload Proof of Payment" + "</h2>" + inputtf +
				"</div></div><br><br>" + imgButton + vButton + postButton + dButton + "<div class='close-button'></div>";
		} else {
			modal.innerHTML = "<center><div><p>" + "<h2 style='color:gray;'>" + "Proof of Payment" + "</h2>" + `<img class="" src="${thumbnail}" alt="Scratch Card Image">` + inputtf +
				"</div></div><br><br>" + imgButton + vButton + postButton + dButton + "<div class='close-button'></div>";

		}


		modal.style.position = 'fixed';
		modal.style.top = '36%';
		modal.style.left = '50%';
		modal.style.width = '300px';
		modal.style.height = 'auto';
		modal.style.transform = 'translate(-50%, -50%)';

		modal.style.backgroundColor = 'white';

		modal.style.padding = '20px';
		modal.style.border = '1px #aaa';
		modal.style.borderRadius = '10px';
		modal.style.zIndex = '9999';

		// Style close button

		var imButton = modal.querySelector('#img-button');


		var closeButton = modal.querySelector('.close-button');
		closeButton.style.position = 'absolute';
		closeButton.style.top = '108%';
		closeButton.style.left = '44%';
		closeButton.style.fontSize = '35px';

		closeButton.style.cursor = 'pointer';

		closeButton.style.background = 'transparent'; // remove the background image property
		closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>'; // wrap the X icon inside a div element with a class name for the circle
		closeButton.style.fontSize = '35px';
		closeButton.style.cursor = 'pointer';
		closeButton.innerHTML = `<svg class="circle" width="32" height="32" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
		<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
	  </svg>`;



		// Add overlay with grey background
		var overlay = document.createElement('div');
		overlay.style.position = 'fixed';
		overlay.style.top = '0';
		overlay.style.left = '0';
		overlay.style.width = '100%';
		overlay.style.height = '100%';
		overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
		overlay.style.zIndex = '9998';

		// Add event listener to close button
		closeButton.addEventListener('click', function () {
			modal.remove();
			overlay.remove();
		});

		let viewButton = modal.querySelector('#v-button');
		viewButton.style.marginTop = '5px';
		viewButton.style.marginBottom = '15px';

		viewButton.style.fontWeight = 'bold';
		viewButton.style.borderRadius = '15px';
		viewButton.style.width = '130px';
		viewButton.style.backgroundColor = '#14a0e1';
		viewButton.style.height = '130px';

		let posButton = modal.querySelector('#post-button');
		posButton.style.marginTop = '5px';
		posButton.style.marginBottom = '15px';

		posButton.style.fontWeight = 'bold';
		posButton.style.borderRadius = '15px';
		posButton.style.width = '250px';

		posButton.disabled = 'true';

		var deleteButton = modal.querySelector('.delete-button');

	deleteButton.style.color = '#ccc';
	deleteButton.style.cursor = 'pointer';

	deleteButton.addEventListener('click', function () {

		if (!counter) {
			deleteButton.innerHTML = "&#x2713; Confirm";
			counter = true;
		} else {
			saveImage("","");
			modal.remove();
			overlay.remove();

		}

	});


		viewButton.addEventListener('click', function () {
			selectFile();
		});

		closeButton.addEventListener('click', function () {
			modal.remove();
			overlay.remove();
		});


		posButton.addEventListener('click', function () {
			//var userInput = prompt("Enter a number:");
			saveImage(sessionStorage.getItem("link"), sessionStorage.getItem("base64"));
			modal.remove();
			overlay.remove();
		});

		if (imageData === "") {
			deleteButton.style.display = `none`;
		} else {
			viewButton.style.display = `none`;
			posButton.style.display = `none`;
		}


		// Add modal and overlay to the page
		document.body.appendChild(modal);
		document.body.appendChild(overlay);

	});

	function scratchcard(canvases, sc, switched, imaged, carded) {
		var count = 0;

		canvases.forEach(function (canvas) {
			var ctx = canvas.getContext('2d');
			var image = canvas.previousElementSibling;
			canvas.width = image.width;
			canvas.height = image.height;

			// Calculate center coordinates
			var centerX = canvas.width / 2;
			var centerY = canvas.height / 2;

			// Calculate half the width and height of the rectangle
			var rectWidth = canvas.width;
			var rectHeight = canvas.height;

			// Adjust the starting coordinates to center the rectangle
			var startX = centerX - rectWidth / 2;
			var startY = centerY - rectHeight / 2;

			ctx.fillStyle = 'gray';
			ctx.fillRect(69, 26, 189, 30);
			ctx.globalCompositeOperation = 'destination-out';

			var scratching = false;

			function scratchStart(event) {
				count++;
				console.log("startscartch: " + count);

				if (count > 8) {
					sc.style.display = `block`;
					if (carded === true) {
						switched.checked = true;
					} else {
						switched.checked = false;
					}
				}

				scratching = true;
				scratch(event);
			}

			function scratchMove(event) {
				if (scratching) {
					scratch(event);
				}
			}

			function scratchEnd() {
				scratching = false;
			}

			function scratch(event) {
				var rect = canvas.getBoundingClientRect();
				var x = event.clientX - rect.left;
				var y = event.clientY - rect.top;

				ctx.beginPath();
				ctx.arc(x, y, 20, 0, 2 * Math.PI);
				ctx.fill();
			}

			canvas.addEventListener('mousedown', scratchStart);
			canvas.addEventListener('mousemove', scratchMove);
			canvas.addEventListener('mouseup', scratchEnd);
			canvas.addEventListener('mouseout', scratchEnd);
			canvas.addEventListener('touchstart', scratchStart);
			canvas.addEventListener('touchmove', scratchMove);
			canvas.addEventListener('touchend', scratchEnd);

			// Calculate the total number of pixels in the scratch area
		});
		imaged.style.opacity = `1`;
	}

	function uploadImages() {

		const imageInput = document.getElementById('img-button');
		const files = imageInput.files;
		const thumbnailsDiv = document.getElementById('thumbnails');
		const vInput = document.getElementById('v-button');
		const posButton = document.getElementById('post-button');
	
		vInput.style.display = 'none';
		//const uploadDiv = document.getElementById('updiv');
	
		//uploadDiv.style.display = 'none';
	
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const storageRef = storage.ref('images/' + file.name);
			const task = storageRef.put(file);
	
			// Create a container for each image
			const imageContainer = document.createElement('div');
			thumbnailsDiv.appendChild(imageContainer);
	
			task.on(
				'state_changed',
				snapshot => {
					// Calculate the upload percentage
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	
					// Update the container with the upload percentage
					imageContainer.innerHTML = '<strong>Uploading: ' + Math.round(progress) + '%</strong>';
				},
				error => {
					console.error('Upload failed:', error);
				},
				() => {
					// Upload is complete, now add the image to the thumbnails
					storageRef.getDownloadURL().then(downloadURL => {
						// Create thumbnail image element
						const thumbnail = document.createElement('img');
						thumbnail.src = sessionStorage.getItem("base64");
						thumbnail.style.maxHeight = 200;
						thumbnail.style.maxWidth = 200;
						thumbnail.style.margin = '1px';
	
						// Create link for download
						const downloadLink = document.createElement('a');
						downloadLink.href = downloadURL;
						downloadLink.download = file.name;
						downloadLink.appendChild(thumbnail);
	
						// Clear the container and append the thumbnail
						imageContainer.innerHTML = '';
						imageContainer.appendChild(thumbnail);
						posButton.disabled = false;
						sessionStorage.setItem("link", downloadURL);
						console.log(sessionStorage.getItem("link"));
					}).catch(error => {
						console.error('Failed to get download URL:', error);
					});
				}
			);
		}
	}

	function selectFile() {
		const fileInput = document.getElementById('img-button');
		const originalValue = fileInput.value;

		fileInput.addEventListener('change', function () {
			if (fileInput.value !== originalValue) {
				// The user selected a file
				uploadImages();
			} else {
				// The user canceled the file selection
				console.log("File selection canceled");
			}
		});

		fileInput.click();
	}
	
	
	function saveImage(image, thumbnail) {
		var quoteRef = database.ref('proofpay/image');

		quoteRef.set({
			image: image,
			thumbnail: thumbnail,
			timestamp: firebase.database.ServerValue.TIMESTAMP
		}, function (error) {
			if (error) {
				console.error("Failed to save quote:", error);
				notif.style.display = "block";
				if (error.code === "PERMISSION_DENIED") {
					//alert("You don't have permission to save quotes.");
					notif.innerHTML = "Database is locked";
				} else if (error.code === "NETWORK_ERROR") {
					//alert("No internet connection. Please check your network settings and try again.");
					notif.innerHTML = "No internet connection.";
				} else {
					//alert("Failed to save quote. Please try again later.");
					notif.innerHTML = "Failed to save link.";
				}
			} else {

				location.reload();

				
			}

		});
	}

	function getImageData() {
		var quoteRef = database.ref('proofpay/image');

		// Using once() to retrieve data once
		quoteRef.once('value', function (snapshot) {
			var imageData = snapshot.val();
			console.log(imageData); // Do something with the retrieved data
		});
	}

	function toggleCheckbox(istrue, cardstatus) {
		var quoteRef = database.ref(`proofpay/${cardstatus}`);

		// Fetch the current value of the checkbox
		quoteRef.once('value', function (snapshot) {
			var isChecked = snapshot.val();

			// Toggle the checkbox value
			quoteRef.set(istrue);
		});
	}

	for (let i = 1; i <= 6; i++) {
		const currentSwitch = document.getElementById('switch' + i);
		const fer = "card" + i + "/isRedeemed";
	
		currentSwitch.addEventListener('change', function () {
			if (this.checked) {
				console.log('Switch ' + i + ' is checked - Marked as redeemed');
				toggleCheckbox(true, fer);
			} else {
				console.log('Switch ' + i + ' is unchecked - Not marked as redeemed');
				toggleCheckbox(false, fer);
			}
		});
	}
	



	

});

function copyNumber(number) {
	navigator.clipboard.writeText(number).then(function () {
		console.log('Number copied to clipboard: ' + number);

	}, function (err) {
		console.error('Unable to copy number: ', err);
	});
}

function handleImage() {
	const input = document.getElementById('img-button');
	const file = input.files[0];

	if (file) {
		const reader = new FileReader();

		reader.onload = function (e) {
			const img = new Image();
			img.src = e.target.result;

			img.onload = function () {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Set the maximum dimensions
				const maxWidth = 700;
				const maxHeight = 500;

				// Calculate the new dimensions
				let newWidth, newHeight;
				if (img.width > img.height) {
					newWidth = maxWidth;
					newHeight = (img.height * maxWidth) / img.width;
				} else {
					newWidth = (img.width * maxHeight) / img.height;
					newHeight = maxHeight;
				}

				// Set canvas dimensions
				canvas.width = newWidth;
				canvas.height = newHeight;

				// Draw the image on the canvas
				ctx.drawImage(img, 0, 0, newWidth, newHeight);

				// Get base64 representation
				const base64 = canvas.toDataURL('image/webp', 0.5); // Adjust the format as needed

				// Log or use the base64 string
				//console.log("Base64 Image:", base64);
				sessionStorage.setItem("base64", base64);
			};
		};

		reader.readAsDataURL(file);
	}
}

function loadingAnimation() {
	let count = 0;
	setInterval(() => {
	  count++;
	  let dots = "";
	  for (let i = 0; i < count - 1; i++) {
		dots += ".";
	  }
	  document.getElementById("loading-dots").innerHTML = "Loading" + dots;
	  if (count === 4) {
		count = 0;
	  }
	}, 500);
  }
  
  loadingAnimation();
