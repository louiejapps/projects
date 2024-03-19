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



firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

window.onload = function () {
	postFrom.reset();
	authorInput.disabled = true;
	setTimeout(function () {
		window.scrollTo(0, 0);
	}, 0);
}

const internetTime = Date.now();
var items = 30;
var database = firebase.database();
var urltext = "";
var posttext = "";
var selectedText = "";
var rnum = "";

moreButton.style.display = `none`;

toPay.addEventListener('click', function () {
	loadDatabase(items, "", 'To Pay', pinTableBody);

});

toShip.addEventListener('click', function () {
	loadDatabase(items, "", 'To Ship', pinTableBody);
});

toReceive.addEventListener('click', function () {
	loadDatabase(items, "", 'To Receive', pinTableBody);
});

toComplete.addEventListener('click', function () {
	loadDatabase(items, "", 'Completed', pinTableBody);
});

loadDatabase(items, "", 'Completed', pinTableBody);

function resetNav() {
	toPay.style.backgroundColor = `#00000044`;
	toShip.style.backgroundColor = `#00000044`;
	toReceive.style.backgroundColor = `#00000044`;
	toComplete.style.backgroundColor = `#00000044`;
}

/*
var usersRef = database.ref('users');

// Fetch data from the 'users' node
usersRef.once('value').then(function (snapshot) {
	snapshot.forEach(function (childSnapshot) {
		var userData = childSnapshot.val();
		var username = userData.username;
		var photo = userData.photo;

		// Add username to the array
		uarray.push(username);

		// Populate the hashmap with username and corresponding photo URL
		profileHashMap[username] = photo;
	});

	var userInput = randomNum(0, (uarray.length - 1));
	user = uarray[parseInt(userInput)];

}).catch(function (error) {
	console.error('Error fetching data:', error);
});

console.log(uarray);
*/

var userInput = randomNum(0, (uarray.length - 1));
user = superuser;
//user = uarray[parseInt(userInput)];

localStorage.setItem("data", internetTime);
sessionStorage.setItem("link", "?");
sessionStorage.setItem("base64", "");
var upflag = false;

const headerImage = document.querySelector("#header-image");
const loading = document.querySelector("#loading-page");
loading.style.display = "block";
headerImage.src = imageHeader;
//previewImage.src = imageURL;

var childNum = 0;

loadThoughts();


const reactArr = ["loves", "likes", "wows", "hahas", "frowns", "dislikes"];

// Reference to the 'users' node in your database


database.ref('quotes').once('value')
	.then((snapshot) => {
		childNum = snapshot.numChildren();
	})
	.catch((error) => {
		console.log("Error retrieving data:", error);
	});

let inputChanged = false;
let more_toggle = false;

function resetPage() {
	location.reload();
	window.location.href = "#top";
	postFrom.reset();
}


showFormButton.addEventListener('click', function () {
	postModal();
});

document.getElementById('floating-icon').addEventListener('click', function () {
	postModal();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

showHdpic.addEventListener('click', function () {
	let loadHD = sessionStorage.getItem(`setQuality`);
	if (loadHD === `High`) {
		sessionStorage.setItem("setQuality", "Low");
		showHdpic.innerHTML = `Image Quality: High | <span style="color:purple;text-decoration: underline">Low</span>`
	} else {
		sessionStorage.setItem("setQuality", "High");
		showHdpic.innerHTML = `Image Quality: <span style="color:purple;text-decoration: underline">High</span> | Low`
	}
	location.reload();
});

searchBt.addEventListener('click', function () {
	var sk = document.getElementById("search-in").value;
	moreButton.innerHTML = "<b>END OF SEARCH RESULTS</b>";
	more_toggle = true;
	showFormButton.innerHTML = "<b>Search results for \"" + sk + "\"</b>";
	window.location.href = "#top";
	column1.style.backgroundColor = "#f2cbc1";
	loadDatabase(1000, sk, false);
	document.getElementById("search-in").value = "";
});

function openLink(url) {
	window.open(url);
}


window.addEventListener('beforeunload', function (e) {
	if (inputChanged) {
		e.preventDefault();
		e.returnValue = '';
	}
});


moreButton.addEventListener('click', function () {


	if (more_toggle) {
		window.location.href = "#top";
		location.reload();
	} else {
		items += 9;

		loadDatabase(items, "", false, quoteTableBody);
		if (childNum <= items) {

		}

	}
});

document.getElementById('banner').addEventListener('dblclick', function (e) {
	resetPage();
});

function checkRegex() {
	let text = quoteTextarea.value;
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const urls = text.match(urlRegex);
	const validUrlRegex = /^https?:\/\/shp\.ee\/.*$/;

	if (urls && urls.length > 0) {
		for (const url of urls) {
			if (validUrlRegex.test(url)) {
				showImage.style.display = "block";
				toolBar.style.display = "none";
				urltext = url;
				posttext = quoteTextarea.value.replace(urlRegex, '<a>$1</a>');
			} else {
				if (window.getComputedStyle(toolbarUrl).display === "none") {
					showImage.style.display = "none";
					toolBar.style.display = "block";
				}
			}
		}
	} else {
		if (window.getComputedStyle(toolbarUrl).display === "none") {
			showImage.style.display = "none";
			toolBar.style.display = "block";
		}
	}
}





































function loadThoughts() {
	console.log("dgsd")
	let messageHashMap = {
		Admin: { image: `${profileHashMap['Admin']}`, shoutout: '+New Thoughts' },
		Fenimaure: { image: profileHashMap['Fenimaure'], shoutout: 'hooray!' },
		ZzenN: { image: profileHashMap['ZzenN'], shoutout: 'Aweome 😍😍' },
		Pennyclied30: { image: profileHashMap['Pennyclied30'], shoutout: '😁😁' },
		louie14388: { image: profileHashMap['louie14388'], shoutout: 'Hi' },
		Jolyows: { image: profileHashMap['Jolyows'], shoutout: 'Orange skies' },
		XtreamCH: { image: profileHashMap['XtreamCH'], shoutout: '🙄😯' },
		ZzzChizCurlzzZ: { image: profileHashMap['ZzzChizCurlzzZ'], shoutout: 'you only have to be right once' },
		JellyMuse: { image: profileHashMap['JellyMuse'], shoutout: 'Go ahead, make my day.' },
		lystar: { image: profileHashMap['lystar'], shoutout: '' },
		sevenEvelyn: { image: profileHashMap['sevenEvelyn'], shoutout: 'All life is equal.' },
		Bradford: { image: profileHashMap['Bradford'], shoutout: 'Valorant' },
		Metsuki: { image: profileHashMap['Metsuki'], shoutout: '' },
		emiehao: { image: profileHashMap['emiehao'], shoutout: 'RG' },
		arrciiemm: { image: profileHashMap['arrciiemm'], shoutout: '' },
		Redclouds: { image: profileHashMap['Redclouds'], shoutout: '' },
		zoyuken: { image: profileHashMap['zoyuken'], shoutout: '' },
		marssh: { image: profileHashMap['marssh'], shoutout: 'golden' },
		abigail98: { image: profileHashMap['abigail98'], shoutout: '' },
		rhomdz: { image: profileHashMap['rhomdz'], shoutout: '' },
		zerojhe101: { image: profileHashMap['zerojhe101'], shoutout: 'earthworm' },
		andreazxcv: { image: profileHashMap['andreazxcv'], shoutout: '' },
		Frenzo125: { image: `${profileHashMap['Frenzo125']}`, shoutout: 'great' },
		zekejaeger: { image: profileHashMap['zekejaeger'], shoutout: '' },
		alkens: { image: profileHashMap['alkens'], shoutout: '' },
		znerski: { image: profileHashMap['znerski'], shoutout: '' },
		icebear: { image: profileHashMap['icebear'], shoutout: '追いかける' },
		scarlett: { image: profileHashMap['scarlett'], shoutout: '' },
		FindingXY: { image: profileHashMap['FindingXY'], shoutout: '' },

		Coolbookkeeper7: { image: profileHashMap['Coolbookkeeper7'], shoutout: '12345😍' },
		astrazelle: { image: profileHashMap['astrazelle'], shoutout: 'uuuu' },
		leviHeichou: { image: profileHashMap['leviHeichou'], shoutout: '' },
		ParkJaechan: { image: profileHashMap['ParkJaechan'], shoutout: '' }
	};

	let mythought = "";

	var quoteRef = database.ref(`users/Admin/thoughts`);
	quoteRef.on('value', function (snapshot) {
		mythought = snapshot.val(); // Retrieve the value from the snapshot
		const chatListContainer = document.getElementById('chat-list');
		chatListContainer.innerHTML = '';

		// Loop through the profileHashMap
		Object.entries(messageHashMap).forEach(([username, data]) => {
			// Create a div element for each chat buddy
			const buddyDiv = document.createElement('div');
			buddyDiv.classList.add('chat-icon-container');

			// Create an image element for the buddy's profile picture
			const imgElement = document.createElement('img');
			imgElement.src = data.image;
			imgElement.alt = `${username}'s profile picture`;

			// Add click event listener to the image
			imgElement.addEventListener('click', () => {
				if (username === `Admin`) {
					thoughtModal(mythought);
				} else {

				}
			});

			// Append the image to the buddy div
			buddyDiv.appendChild(imgElement);

			// Add thought bubble for shoutout message if it's not empty
			if (data.shoutout.trim() !== '') {
				const thoughtBubble = document.createElement('div');
				thoughtBubble.classList.add('thought-bubble');


				if (username === `Admin`) {
					console.log(mythought);
					if (mythought === "") {
						thoughtBubble.style.fontSize = `0.85em`;
						thoughtBubble.style.fontFamily = `cursive`;

						thoughtBubble.style.fontWeight = `bold`;
						thoughtBubble.style.lineHeight = `1em`;
						thoughtBubble.style.maxWidth = `60px`;
						thoughtBubble.textContent = "+New Thoughts";
					} else {
						thoughtBubble.textContent = mythought;
					}

				} else {
					thoughtBubble.textContent = data.shoutout;
				}
				buddyDiv.appendChild(thoughtBubble);
			}

			// Create a text element for the profile name
			const profileName = document.createElement('div');
			profileName.classList.add('profile-name');
			profileName.textContent = username;

			// Append the profile name to the buddy div
			buddyDiv.appendChild(profileName);

			// Append the buddy div to the container
			chatListContainer.appendChild(buddyDiv);
		});

	}, function (error) {
		console.error("Error retrieving data:", error);
	});
}















/*                                                                                                                          
UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   LLLLLLLLLLL                  OOOOOOOOO                 AAA               DDDDDDDDDDDDD        
U::::::U     U::::::UP::::::::::::::::P  L:::::::::L                OO:::::::::OO              A:::A              D::::::::::::DDD     
U::::::U     U::::::UP::::::PPPPPP:::::P L:::::::::L              OO:::::::::::::OO           A:::::A             D:::::::::::::::DD   
UU:::::U     U:::::UUPP:::::P     P:::::PLL:::::::LL             O:::::::OOO:::::::O         A:::::::A            DDD:::::DDDDD:::::D  
 U:::::U     U:::::U   P::::P     P:::::P  L:::::L               O::::::O   O::::::O        A:::::::::A             D:::::D    D:::::D 
 U:::::D     D:::::U   P::::P     P:::::P  L:::::L               O:::::O     O:::::O       A:::::A:::::A            D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPP:::::P   L:::::L               O:::::O     O:::::O      A:::::A A:::::A           D:::::D     D:::::D
 U:::::D     D:::::U   P:::::::::::::PP    L:::::L               O:::::O     O:::::O     A:::::A   A:::::A          D:::::D     D:::::D
 U:::::D     D:::::U   P::::PPPPPPPPP      L:::::L               O:::::O     O:::::O    A:::::A     A:::::A         D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O   A:::::AAAAAAAAA:::::A        D:::::D     D:::::D
 U:::::D     D:::::U   P::::P              L:::::L               O:::::O     O:::::O  A:::::::::::::::::::::A       D:::::D     D:::::D
 U::::::U   U::::::U   P::::P              L:::::L         LLLLLLO::::::O   O::::::O A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D 
 U:::::::UUU:::::::U PP::::::PP          LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::OA:::::A             A:::::A   DDD:::::DDDDD:::::D  
  UU:::::::::::::UU  P::::::::P          L::::::::::::::::::::::L OO:::::::::::::OOA:::::A               A:::::A  D:::::::::::::::DD   
	UU:::::::::UU    P::::::::P          L::::::::::::::::::::::L   OO:::::::::OO A:::::A                 A:::::A D::::::::::::DDD     
	  UUUUUUUUU      PPPPPPPPPP          LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO  AAAAAAA                   AAAAAAADDDDDDDDDDDDD        
*/


function uploadImages() {

	const theToolbar = document.getElementById('toolbar');
	const imageInput = document.getElementById('img-button');
	const files = imageInput.files;
	const thumbnailsDiv = document.getElementById('thumbnails');
	const posButton = document.getElementById('post-button');;

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

				theToolbar.style.display = 'none';
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
					thumbnail.src = sessionStorage.getItem("base64");;
					thumbnail.style.maxHeight = "200px";
					thumbnail.style.maxWidth = "300px";
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

	fileInput.addEventListener('change', function handleFileChange() {
		// Remove the event listener to prevent further changes
		fileInput.removeEventListener('change', handleFileChange);

		// The user selected a file
		if (upflag === false) {

			uploadImages();
			upflag = true;
		} else {
			console.log(upflag);
		}
	});

	fileInput.click();
}

function getSelectedText() {
	// Get the selected text and store it in the variable
	selectedText = window.getSelection().toString();
}

function limitCharacters(inputString, maxLength) {
	let trimmedString = inputString.trim();

	if (trimmedString.length > maxLength) {
		return trimmedString.substring(0, maxLength);
	} else {
		return trimmedString;
	}
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
				const maxWidth = 800;
				const maxHeight = 800;

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
				const base64 = canvas.toDataURL('image/webp', 0.8); // Adjust the format as needed

				// Log or use the base64 string
				//console.log("Base64 Image:", base64);
				sessionStorage.setItem("base64", base64);
			};
		};

		reader.readAsDataURL(file);
	}
}


/*                                                                                                        
LLLLLLLLLLL                  OOOOOOOOO                    AAA               DDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
L:::::::::L                OO:::::::::OO                 A:::A              D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
L:::::::::L              OO:::::::::::::OO              A:::::A             D:::::::::::::::DD   D:::::::::::::::DD   B::::::BBBBBB:::::B 
LL:::::::LL             O:::::::OOO:::::::O            A:::::::A            DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::B     B:::::B
  L:::::L               O::::::O   O::::::O           A:::::::::A             D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
  L:::::L               O:::::O     O:::::O          A:::::A:::::A            D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O         A:::::A A:::::A           D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O        A:::::A   A:::::A          D:::::D     D:::::D  D:::::D     D:::::D  B:::::::::::::BB  
  L:::::L               O:::::O     O:::::O       A:::::A     A:::::A         D:::::D     D:::::D  D:::::D     D:::::D  B::::BBBBBB:::::B 
  L:::::L               O:::::O     O:::::O      A:::::AAAAAAAAA:::::A        D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L               O:::::O     O:::::O     A:::::::::::::::::::::A       D:::::D     D:::::D  D:::::D     D:::::D  B::::B     B:::::B
  L:::::L         LLLLLLO::::::O   O::::::O    A:::::AAAAAAAAAAAAA:::::A      D:::::D    D:::::D   D:::::D    D:::::D   B::::B     B:::::B
LL:::::::LLLLLLLLL:::::LO:::::::OOO:::::::O   A:::::A             A:::::A   DDD:::::DDDDD:::::D  DDD:::::DDDDD:::::D  BB:::::BBBBBB::::::B
L::::::::::::::::::::::L OO:::::::::::::OO   A:::::A               A:::::A  D:::::::::::::::DD   D:::::::::::::::DD   B:::::::::::::::::B 
L::::::::::::::::::::::L   OO:::::::::OO    A:::::A                 A:::::A D::::::::::::DDD     D::::::::::::DDD     B::::::::::::::::B  
LLLLLLLLLLLLLLLLLLLLLLLL     OOOOOOOOO     AAAAAAA                   AAAAAAADDDDDDDDDDDDD        DDDDDDDDDDDDD        BBBBBBBBBBBBBBBBB   
*/


function loadDatabase(itemCount, searchkey, headname, tablebody) {
	console.log('load')
	let loadHD = sessionStorage.getItem(`setQuality`);



	if (headname === "") {
		resetNav();
		toPay.style.backgroundColor = `#000000cc`;
	}


	if (headname === 'To Pay') {
		resetNav();
		toPay.style.backgroundColor = `#000000cc`;
	} else if (headname === 'To Ship') {
		resetNav();
		toShip.style.backgroundColor = `#000000cc`;
	} else if (headname === 'To Receive') {
		resetNav();
		toReceive.style.backgroundColor = `#000000cc`;
	} else if (headname === 'Completed') {
		resetNav();
		toComplete.style.backgroundColor = `#000000cc`;
	} else {
		resetNav();
		toComplete.style.backgroundColor = `#000000cc`;
	}

	let dbRef = "";
	dbRef = database.ref('quotes').orderByChild('status').equalTo(headname).limitToLast(itemCount);

	dbRef.on('value', function (snapshot) {


		tablebody.innerHTML = `<br><center><span style="text-align: left;font-weight: bold;font-size: 1.03em;text-align:center">${headname}:</span></center>`;
			
		if (snapshot.exists()) {
			itemCount = snapshot.numChildren();
			tablebody.innerHTML = `<br><center><span style="text-align: left;font-weight: bold;font-size: 1.03em;text-align:center">${headname} (${itemCount}):</span></center>`;
			//console.log(itemCount);
		} else {
			itemCount = 0;
			tablebody.innerHTML = `<br><center><span style="text-align: left;font-weight: bold;font-size: 1.03em;text-align:center">${headname} (${itemCount}):</span></center>`;
		}
		//updatelike(type, itemCount);




		// Generate new table rows in reverse order
		var quotes = [];
		snapshot.forEach(function (childSnapshot) {
			var childData = childSnapshot.val();
			childData.key = childSnapshot.key;

			if (((childData.hasOwnProperty('uname') && childData.uname.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('quote') && childData.quote.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('title') && childData.title.indexOf(searchkey) !== -1))) {
				quotes.push(childData);
			}
		});

		quotes.reverse(); // Reverse the order of the quotes
		quotes.forEach(function (childData) {
			let IMGquality = ``;

			if (loadHD === `High`) {
				IMGquality = `${childData.quote}`;
			} else {
				IMGquality = `${childData.thumbnail}`;
			}
			var rrow = document.createElement('tr');
			let divStyle = "";
			let bkgStyle = "background-color: rgba(255, 255, 255, 0.8);";
			let borderStyle = "lightgrey";

			divStyle = `<td style='padding-top: 7.5px;padding-bottom: 7.5px;'>
			<div id = 'rdiv' style='${bkgStyle}; padding-top:2.5px; padding-bottom:2.5px; border: solid 0px ${borderStyle};'>`;

			let myAuthor = "";
			let indicator = "";
			let userSpan = `<span style="color: #de3c35;font-size:0.8em;font-weight:bold;">${childData.uname} </span>`;
			myAuthor = `${userSpan} ${indicator}`;


			let myViews = childData.views + " Seen" + (eval(childData.views) == 1 ? "" : "s");
			let myQuote = "";
			let myCaption = ``;


			let setStatus = ``;



			if (childData.status === 'To Pay') {
				setStatus =
					`<option value="to-Pay" selected>To Pay</option>
				<option value="to-Ship">To Ship</option>
				<option value="to-Receive">To Receive</option>
				<option value="to-Complete">Completed</option>`;
			} else if (childData.status === 'To Ship') {
				setStatus =
					`<option value="to-Pay">To Pay</option>
				<option value="to-Ship" selected>To Ship</option>
				<option value="to-Receive">To Receive</option>
				<option value="to-Complete">Completed</option>`;
			} else if (childData.status === 'To Receive') {
				setStatus =
					`<option value="to-Pay">To Pay</option>
				<option value="to-Ship">To Ship</option>
				<option value="to-Receive" selected>To Receive</option>
				<option value="to-Complete">Completed</option>`;
			} else if (childData.status === 'Completed') {
				setStatus =
					`<option value="to-Pay">To Pay</option>
				<option value="to-Ship">To Ship</option>
				<option value="to-Receive">To Receive</option>
				<option value="to-Complete" selected>Completed</option>`;
			} else {
				setStatus =
					`<option value="to-Pay" selected>To Pay</option>
				<option value="to-Ship">To Ship</option>
				<option value="to-Receive">To Receive</option>
				<option value="to-Complete">Completed</option>`;
			}



			let myOrderText = `
    <div style="font-family: Arial, sans-serif; background-color: transparent; padding: 0px; margin-left: 15px; border-radius: 5px; text-align:center">
        <p style="color: #666666; margin-bottom: 5px;">Tracking Number: ${childData.tracking}</p>
        <p style="color: #666666; margin-bottom: 5px; font-weight:bold">Price: ₱${childData.price}</p>
    </div>
`;


			if (childData.quote === "?") {
				if (childData.hasOwnProperty('caption')) {

					let myBackground = "";

					let fontSize = (childData.caption.length < 160) ? "font-size:1.5em" : "font-size:1.2em";


					if (childData.background === "") {
						myBackground = "" + ";white-space: pre-line;text-align:center; font-weight: normal;word-wrap:break-word;padding:10px;font-size:1.1em'"
					} else {
						myBackground = childData.background + ";text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); color: #fff;white-space: pre-line;text-align:center; font-weight: bold;" + fontSize + "; word-wrap:break-word;padding:100px; font-family: sans-serif'";
					}



					myCaption = "<p style='background:" + myBackground + ">" + childData.caption + "</p>";


				}
				//myQuote = "<img src='" + imageURL + "' alt='Cannot load image 😓' id='load-image' style='width: 100%;'>";
			} else {


				myQuote = `<center><img id='thumbs' src='${IMGquality}' alt='Cannot load image 😓' id='load-image'
					style='max-width: 100%;max-height:400px'  style='display: none;'></center>`;


				if (childData.hasOwnProperty('caption')) {
					if (childData.caption === "") {
						myCaption = "";
					} else {
						myCaption = "<section style='white-space: pre-line;text-align:center; font-size:0.9em; font-weight:bold; word-wrap:break-word;padding:2.5px;'>" + childData.caption + "</section>";
					}
				}

			}
			let myTime = getTimeString(childData.timestamp);

			let dotsMenu = `
				<!-- Icons section -->
				<div id="menu-options" class="button-div" style="margin-right:10px" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
				ontouchend="this.style.backgroundColor='transparent';">
					<svg width="16" height="16" fill="currentColor"
						class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
						<path
							d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
					</svg>
				</div>
				`


			let myReaction = "";
			if (childData.react && childData.react.hasOwnProperty(user)) {
				myReaction = childData.react[user];
			}
			// If-else if-else statements
			let reactBut = "";

			if (myReaction === "likes") {
				reactBut = `<span style = "font-size: 1.2em">👍 Like</span>`;
			} else if (myReaction === "loves") {
				reactBut = `<span style = "font-size: 1.2em">❤️ Love</span>`;
			} else if (myReaction === "wows") {
				reactBut = `<span style = "font-size: 1.2em">🔥 Lit</span>`;
			} else if (myReaction === "hahas") {
				reactBut = `<span style = "font-size: 1.2em">😂 Funny</span>`;
			} else if (myReaction === "frowns") {
				reactBut = `<span style = "font-size: 1.2em">😥 Worried</span>`;
			} else if (myReaction === "dislikes") {
				reactBut = `<span style = "font-size: 1.2em">👎 Dislike</span>`;
			} else {
				reactBut = `
				<svg width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" style="vertical-align: middle;" viewBox="0 0 16 16">
				<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
			  </svg>
				React				
				`;
			}


			/////////////////////////////////////////////////////////
			var tableHTML = `
			<div style="display: flex; width: 100%; justify-content: space-between; align-items: center; padding: 5px;">

			<div>
				<table style='margin:7px'>
					<tr>
						<td rowspan='2' style='text-align:center;'>
							<img src='${profileHashMap[childData.uname]}' alt='Profile Image' width='32'
								style='border-radius: 50%;'>
						</td>
						<td>
							<span style='color:#ed4c2b;font-size: 18px'>${myAuthor}</span>
						</td>
					</tr>
					<tr>
						<td><span style='color:#808080;word-wrap: break-word;font-size: 12px'>Posted: ${myTime}</span>
						</td>
					</tr>
				</table>
			</div>
	
${dotsMenu}
		</div>



		<span style="color: #333333; margin-left:15px;margin-bottom: 15px;font-weight:bold;font-size:1.1em">My Order: ${childData.ordername}</span>
		<br>
		<div id="orderstatus" style="margin-left:15px">
				<label for="cars">Status:</label>
			  
				<select id="orderStatuses">
				
		${setStatus}
				</select>
			  
				<p id="selectedCar"></p>
			  </div>
			`;

			const reactionMap = {
				loves: getReactCount(childData.key, "loves"),
				likes: getReactCount(childData.key, "likes"),
				wows: getReactCount(childData.key, "wows"),
				hahas: getReactCount(childData.key, "hahas"),
				frowns: getReactCount(childData.key, "frowns"),
				dislikes: getReactCount(childData.key, "dislikes"),
				views: getCount(childData.key, "views"),
				comments: getCount(childData.key, "comments")
			};

			let rowData = `
			${divStyle}
			${tableHTML}
			${myQuote}
			${myOrderText}

			<hr>
			
			${generateReactionHTML(reactionMap)}
			
			<div style='height:auto; margin-top:5px'>

				<span style="color: #008ba3; font-size: 0.7em; display: flex; align-items: center;">

					<span style="width: 100%; display: inline-block; text-align: center;">
						<div id="react-div" onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';
							this.style.transition='background-color 0.3s ease'" onmouseout="this.style.backgroundColor='transparent';
							this.style.transition='background-color 0.3s ease'"	
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 10px; margin-right: 5px; cursor: pointer; color: #65676b;
							font-weight: bold; vertical-align: middle;">
								${reactBut}</div>
					</span>
			
					<span style="width: 100%; display: inline-block; text-align: center; vertical-align: middle; ">					
							<div id="comment-div" onmouseover="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';
							this.style.transition='background-color 0.3s ease'" onmouseout="this.style.backgroundColor='transparent';
							this.style.transition='background-color 0.3s ease'"
							ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
							ontouchend="this.style.backgroundColor='transparent';" 
							style="background-color: transparent; padding: 10px; cursor: pointer; color: #65676b;
							font-weight: bold; vertical-align: middle;">
								<svg width="16" height="16" fill="currentColor" class="bi bi-chat-right-text"  style="vertical-align: middle;" viewBox="0 0 16 16">
									<path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
								<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
						  		</svg>
									Comment
							</div>
					</span>
		
				</span>
		
			</div>
			</td>`;

			rrow.innerHTML = rowData;

			let thumbsBut = rrow.querySelector(`#thumbs`);

			if (thumbsBut) {
				rrow.querySelector(`#thumbs`).addEventListener("click", function (event) {
					setViewer(childData.key, sessionNumber);
					commentModal(childData);
				});
			}

			/////////////////////////////////////////////////////////

			tablebody.appendChild(rrow);



			rrow.querySelector(`#menu-options`).addEventListener("click", function (event) {
				var clickX = event.clientX;
				var clickY = event.clientY;
				menuModal(clickX, clickY, childData);
			});

			let reactDiv = rrow.querySelector(`#react-div`);
			reactDiv.addEventListener("click", function (event) {
				var clickX = event.clientX;
				var clickY = event.clientY;
				reactModal(clickX, clickY, childData, reactDiv);
			});

			rrow.querySelector(`#comment-div`).addEventListener("click", function () {
				setViewer(childData.key, sessionNumber);
				commentModal(childData);
			});

			rrow.querySelector(`#orderStatuses`).addEventListener("change", handleSelection);

			// Define a function to handle the selection
			function handleSelection(event) {
				var selectedValue = event.target.value;

				if (selectedValue === "to-Pay") {
					newStatus(childData.key, "To Pay");
				} else if (selectedValue === "to-Ship") {
					newStatus(childData.key, "To Ship");
				} else if (selectedValue === "to-Receive") {
					newStatus(childData.key, "To Receive");
				} else if (selectedValue === "to-Complete") {
					newStatus(childData.key, "Completed");
				} else {

				}
			}

			document.title = "ORDERS | " + user;

			loading.style.display = 'none';

		});

	}, function (error) {
		console.error("Failed to retrieve quotes:", error);
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
	});


}


/*                                                                                                                                                       
																							dddddddd                                                           
																							d::::::d                           tttt                            
																							d::::::d                        ttt:::t                            
																							d::::::d                        t:::::t                            
																							d:::::d                         t:::::t                            
	ssssssssss     aaaaaaaaaaaaa   vvvvvvv           vvvvvvv    eeeeeeeeeeee        ddddddddd:::::d   aaaaaaaaaaaaa   ttttttt:::::ttttttt      aaaaaaaaaaaaa   
  ss::::::::::s    a::::::::::::a   v:::::v         v:::::v   ee::::::::::::ee    dd::::::::::::::d   a::::::::::::a  t:::::::::::::::::t      a::::::::::::a  
ss:::::::::::::s   aaaaaaaaa:::::a   v:::::v       v:::::v   e::::::eeeee:::::ee d::::::::::::::::d   aaaaaaaaa:::::a t:::::::::::::::::t      aaaaaaaaa:::::a 
s::::::ssss:::::s           a::::a    v:::::v     v:::::v   e::::::e     e:::::ed:::::::ddddd:::::d            a::::a tttttt:::::::tttttt               a::::a 
 s:::::s  ssssss     aaaaaaa:::::a     v:::::v   v:::::v    e:::::::eeeee::::::ed::::::d    d:::::d     aaaaaaa:::::a       t:::::t              aaaaaaa:::::a 
   s::::::s        aa::::::::::::a      v:::::v v:::::v     e:::::::::::::::::e d:::::d     d:::::d   aa::::::::::::a       t:::::t            aa::::::::::::a 
	  s::::::s    a::::aaaa::::::a       v:::::v:::::v      e::::::eeeeeeeeeee  d:::::d     d:::::d  a::::aaaa::::::a       t:::::t           a::::aaaa::::::a 
ssssss   s:::::s a::::a    a:::::a        v:::::::::v       e:::::::e           d:::::d     d:::::d a::::a    a:::::a       t:::::t    tttttta::::a    a:::::a 
s:::::ssss::::::sa::::a    a:::::a         v:::::::v        e::::::::e          d::::::ddddd::::::dda::::a    a:::::a       t::::::tttt:::::ta::::a    a:::::a 
s::::::::::::::s a:::::aaaa::::::a          v:::::v          e::::::::eeeeeeee   d:::::::::::::::::da:::::aaaa::::::a       tt::::::::::::::ta:::::aaaa::::::a 
 s:::::::::::ss   a::::::::::aa:::a          v:::v            ee:::::::::::::e    d:::::::::ddd::::d a::::::::::aa:::a        tt:::::::::::tt a::::::::::aa:::a
  sssssssssss      aaaaaaaaaa  aaaa           vvv               eeeeeeeeeeeeee     ddddddddd   ddddd  aaaaaaaaaa  aaaa          ttttttttttt    aaaaaaaaaa  aaaa

*/

function setViewer(id, sn) {
	var quoteRef = database.ref(`quotes/${id}/views/${sn}`);
	quoteRef.set(true);
}


function saveData(quote, uname, tbn, caption, ordername, tracking, price, background) {
	inputChanged = false;
	saveButton.disabled = true;
	caption = "";


	var lineBreakCount = (caption.match(/\n/g) || []).length;
	if (lineBreakCount > 5) {
		return false;
	} else {

		if (uname.length > 50) {
			uname = uname.substring(0, 50);
		}

		// Save form data to Firebase Realtime Database
		if (navigator.onLine) {

			var quoteRef = database.ref('quotes').push();

			quoteRef.set({

				quote: limitCharacters(quote, 200),
				ordername: ordername,
				tracking: tracking,
				price: price,
				uname: uname,
				thumbnail: tbn,
				sessionkey: internetTime,
				pinned: false,
				show: "true",
				views: "0",
				visits: "0",
				background: background,
				caption: caption,
				subtitle: "Guest",
				status: 'To Pay',
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
					myForm.style.display = 'none';
					postFrom.reset();
					showFormButton.style.display = 'block';
					myContent.style.display = 'block';
					notif.style.display = "block";
					notif.innerHTML = "Shared Successfully!";
					setTimeout(function () {
						notif.innerHTML = "";
					}, 5000);
					saveButton.disabled = false;
				}

			});

		} else {
			notif.style.display = "block";
			notif.innerHTML = "No Connection";
		}
		return true;

	}


}

function toggleLike(type, quoteId, username) {
	for (let i = 0; i < reactArr.length; i++) {
		document.getElementById(`${reactArr[i]}`).style.fontSize = `1em`;
	}

	var databaseRef = database.ref(`quotes/${quoteId}/react/${username}`);
	if (type === "") {
		databaseRef.remove();
	} else {
		databaseRef.set(type);
		const element = document.getElementById(`${type}`);

		if (element) {
			element.style.fontSize = `2em`;
		}

	}
}

function getReactCount(quoteId, type) {

	var itemCount = 0;
	firebase.database().ref(`quotes/${quoteId}/react`).orderByValue().equalTo(type).once('value', function (snapshot) {

		if (snapshot.exists()) {
			itemCount = snapshot.numChildren();
			//console.log(itemCount);
		} else {
			itemCount = 0;
		}
		//updatelike(type, itemCount);
	});

	//console.log(itemCount);
	return itemCount;
}

function getCount(quoteId, commentview) {

	var itemCount = 0;
	firebase.database().ref(`quotes/${quoteId}/${commentview}`).once('value', function (snapshot) {

		if (snapshot.exists()) {
			itemCount = snapshot.numChildren();
			//console.log(itemCount);
		} else {
			itemCount = 0;
		}
		//updatelike(type, itemCount);
	});

	//console.log(itemCount);
	return itemCount;
}

function generateReactionHTML(reactionMap) {
	// Sort the reactionMap in descending order based on counts
	const sortedReactions = Object.entries(reactionMap)
		.sort(([, countA], [, countB]) => countB - countA)
		.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

	// Generate HTML based on sortedReactions
	const htmlString = `
    <div
        style="display: flex; justify-content: space-between; align-items: center; padding: 5px; margin: 5px; background-color: transparent;">

        <div
            style="display: flex; gap: 0px; align-items: center; font-family: 'Arial', sans-serif; font-size: 12px; color: #333;">

            ${Object.entries(sortedReactions)
			.filter(([reaction, count]) => count > 0 && reaction !== 'comments' && reaction !== 'views')
			.map(([reaction, count]) => `
            <div
                style="display: flex; align-items: center; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; margin-right: 5px;">
                ${getEmoji(reaction)}
                <div style="margin-left: 3px; font-weight: bold;">${count}</div>
            </div>
            `).join('')}
        </div>

        <div
            style="display: flex; gap: 0px; align-items: center; font-family: 'Arial', sans-serif; font-size: 12px; color: #333;">
            <div
                style="display: flex; align-items: center; margin-right: 5px; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff;">
                <svg width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path
                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
                <div style="margin-left: 3px; font-weight: bold;">${reactionMap.views || 0}</div>
            </div>

            <div
                style="display: flex; align-items: center; padding: 4px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff;">
                <svg width="16" height="16" fill="currentColor" class="bi bi-chat-right" viewBox="0 0 16 16">
                    <path
                        d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                </svg>
                <div style="margin-left: 5px; font-weight: bold;">${reactionMap.comments || 0}</div>
            </div>
        </div>

    </div>
	`;

	// Helper function to get emoji based on reaction key
	function getEmoji(reaction) {
		const emojiMap = {
			loves: '❤️',
			likes: '👍',
			wows: '🔥',
			hahas: '😂',
			frowns: '😥',
			dislikes: '👎'
		};
		return emojiMap[reaction];
	}

	return htmlString;
}

function getTotalReact(quoteId) {
	var totalcount = 0;
	firebase.database().ref(`quotes/${quoteId}/react`).once('value', function (snapshot) {
		if (snapshot.exists()) {
			totalcount = snapshot.numChildren();
		} else {

		}
	});


	return (totalcount);
}

function updatelike(type, itemcount) {
	const element = document.getElementById(`${type}`);

	if (element) {
		if (itemcount === 0) {
			element.innerText = ` `;
		} else {
			element.innerText = `${itemcount}`;
		}
	}

}

function togglePin(quoteId) {
	// Toggle the like status for the user on this quote
	database.ref(`quotes/${quoteId}/pinned`).transaction(currentLike => !currentLike);
}

function newStatus(quoteId, newstat) {
	database.ref(`quotes/${quoteId}/status`).set(newstat);
	loadDatabase(items, "", newstat, pinTableBody);
}

function newTracking(quoteId, newtracking) {
	database.ref(`quotes/${quoteId}/tracking`).set(newtracking);
}


function setComment(key, username, message, stype) {

	console.log(stype);

	const commentsRef = database.ref(`quotes/${key}/comments`);

	let stickerPost = `<img src="mage/${stype}.png" height="75px">`;

	if (!(stype === "")) {
		message = stickerPost;
	}

	commentsRef.push({
		username: username,
		message: message,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	});
}

function loadComments(key, commentTB) {
	commentTB.innerHTML = '';
	let maxW = ""
	if (window.matchMedia("(orientation: landscape)").matches) {
		maxW = "max-width: 400px";
	} else {
		maxW = "max-width: 300px";
	}


	const commentsRef = database.ref(`quotes/${key}/comments`);
	var comments = [];
	commentsRef.orderByChild('timestamp').on('value', function (snapshot) {
		snapshot.forEach(function (commentSnapshot) {
			var commentData = commentSnapshot.val();
			commentData.key = commentSnapshot.key;
			comments.push(commentData);
		});
		comments.reverse();
	});

	comments.forEach(function (commentData) {


		var crow = document.createElement('tr')
		crow.innerHTML =
			`<td>

			<table border="0" style="border-collapse: collapse; width: 100%;">
			<tr>
				<td style="width: 25px; height: 25px; padding: 1px; text-align: center;">
					<img src='${profileHashMap[commentData.username]}' alt='Profile Image' width='32px' style='border-radius: 50%;'>
				</td>
				<td style="padding: 1px; text-align: center;">
					<div style="${maxW}; height: auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					padding: 5px; margin: 5px;  text-align: left;">
					<span style="color: #666666;font-size:0.8em;word-wrap: break-word;">
					<span style="color: #4257B2;font-size:0.7em;font-weight: bold;">${commentData.username}</span>
					<br>
					${commentData.message}</span>
					<br>
					<div style="display: flex; justify-content: space-between;">
					<span style="color: #b0b3b8; font-size: 0.7em; word-wrap: break-word;">${getTimeString(commentData.timestamp)}</span>
					<span class="button-div" id="del-comment" style="display: inline-block; color: #FF6961; font-size: 0.7em; word-wrap: break-word;"
					ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
					ontouchend="this.style.backgroundColor='transparent';"
					>Delete</span>
				  </div>
				  
					</div>
				</td>
			</tr>
		</table>
		</td>`;

		commentTB.appendChild(crow);

		crow.querySelector('#del-comment').addEventListener('dblclick', function () {
			event.preventDefault();
			commentsRef.child(commentData.key).remove()
				.then(() => {
					loadComments(key, commentTB);
					console.log("Data successfully deleted");
				})
				.catch((error) => {
					console.log("Error deleting data:", error);
				});
		});
	});
}
