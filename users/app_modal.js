function postModal() {
	sessionStorage.setItem("link", "?");
	sessionStorage.setItem("base64", "");
	rnum = "";

	upflag = false;
	var modal = document.createElement('div');

	let myAuthor = "<big><b style='color:#ed4c2b;'>" + "CREATE POST" + "</b></big>";
	let imgButton = "<input type='file' id='img-button' onchange='handleImage()' accept='image/*'>";
	let postButton = "<button class='view-button' id='post-button'>POST</button>";
	let htmlString = `
	<table border="0" class="tbn" align="center">
	<tr>
		<td style="text-align:left; vertical-align:middle;height: 50;padding:2px;">
		<span id="yourname" style="color: #C34632; margin-left: 10px;">Post Anonymously</span>
		</td>
	
		<td style="text-align:right; vertical-align:middle; padding:15px;">
			<label class="toggle-switch">
				<input type="checkbox" unchecked>
				<span class="slider"></span>
			</label>
		</td>
	</tr>
	
	<tr>
		<td colspan="2" style="">
			<input type="text" id="itemName" placeholder="Order Item Name">
			<br>
      <input type="text" id="trackingNumber" placeholder="Tracking Number">
	  <br>
      <input type="number" id="price" placeholder="Price">
	  <br>
	  
			<div id="show-image" class="image-container" style="display:block; height:auto; width:100%">
				<div id='thumbnails' style="text-align: center;"></div>
				
			</div>
			<div id="toolbar" align="center" style="width:100%;">
				<table border="0" align="center" style="width:100%;">
					<tr>

					<td style="width: 7%">
						<div class="button-div">
							<img src="photos.png" width="36px" id="toolbar-2">
						</div>
						</td>

						<td style="width: 7%">
						<div class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
						ontouchend="this.style.backgroundColor='transparent';">
							<img src="Aa_square.png" width="36px" id="toolbar-1">
						</div>
						</td>
	
						
	
						<td style="width: 7%">
						<div class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';" 
						ontouchend="this.style.backgroundColor='transparent';">
							<img src="linkurl.png" width="36px" id="toolbar-3">
						</div>
						</td>
	
						<td style="width: auto">
							<div style="text-align:right;display: none;" id="toolbar-4">
								<img src="reset.png" width="35px">
								<input type='hidden' id='caption'>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
	</table>`;
	modal.innerHTML = "<center><div><p>" + myAuthor + "" +
		"</div></div>" + imgButton + htmlString + postButton + "<div class='close-button'></div>";

	modal.style.position = 'fixed';
	modal.style.top = '36%';
	modal.style.left = '50%';
	//modal.style.width = '90vw';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Define minimum width in pixels
	const minWidth = 330; // Adjust this value as needed

	// Check if the viewport is in landscape or portrait mode
	if (window.matchMedia("(orientation: landscape)").matches) {
		// Landscape mode (desktop)
		modal.style.width = `max(30%, ${minWidth}px)`;
	} else {
		// Portrait mode (mobile devices)
		modal.style.width = `max(90%, ${minWidth}px)`;
	}

	var captionArea = modal.querySelector('#caption');


	var closeButton = modal.querySelector('.close-button');
	closeButton.style.cssText = `
    	position: absolute;
    	top: 103%;
    	left: 46.5%;
    	font-size: 35px;
    	cursor: pointer;
    	background: transparent;
    	font-size: 35px;
    	cursor: pointer;`;
	closeButton.innerHTML = `<svg class="circle" width="32" height="32" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
		<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
	  </svg>`;

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var overlay = document.createElement('div');
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 9998;
	`;

	let posButton = modal.querySelector('#post-button');
	posButton.style.cssText = `
		margin-top: 10px;
		margin-bottom: 15px;
		font-weight: bold;
		border-radius: 15px;
		width: 100%;
	`;
	posButton.disabled = true;

	let toolbar1 = modal.querySelector('#toolbar-1');
	let toolbar2 = modal.querySelector('#toolbar-2');
	let toolbar3 = modal.querySelector('#toolbar-3');
	let toolbar4 = modal.querySelector('#toolbar-4');

	toolbar1.addEventListener('click', function (event) {
		/*rnum = randomNum(0, (gradients.length - 1));
		captionArea.style.paddingTop = "80px";
		captionArea.style.paddingBottom = "80px";
		captionArea.style.fontSize = "1.5rem";
		captionArea.style.textAlign = "center";
		captionArea.style.background = gradients[rnum];
		captionArea.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.4)";
		captionArea.style.color = "#fff";
		captionArea.style.height = "auto";
		captionArea.style.height = `${quoteTextarea.scrollHeight + 200}px`;
		//toolbar4.style.display = 'block';
		toolbar2.style.display = 'none';
		toolbar3.style.display = 'none';*/
	});

	toolbar2.addEventListener('click', function () {
		captionArea.style.cssText = `
		padding-top: "";
		padding-bottom: "";
		font-size: "";
		font-weight: "";
		text-align: "";
		background: "";
		text-shadow: "";
		color: "";
		height: 10px;
	`;
		selectFile();

	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	//POSTBUTTON
	//POSTBUTTON

	posButton.addEventListener('click', function () {

		let bkg = "";

		if (rnum === "") {
			bkg = "";
		} else {
			bkg = gradients[rnum];
		}

		if (sessionStorage.getItem("link") === "?") {
			if (saveData("?", user, "?", null, text1.value, text2.value, text3.value, bkg)) {
				modal.remove();
				overlay.remove();
			}
		} else {
			if (saveData(sessionStorage.getItem("link"), user, sessionStorage.getItem("base64"), null, text1.value, text2.value, text3.value, null)) {
				modal.remove();
				overlay.remove();
			}
		}
	});

	//var Textarea = document.querySelector('#caption');
	const text1 = document.querySelector('#itemName');
	const text2 = document.querySelector('#trackingNumber');
	const text3 = document.querySelector('#price');

	const checkInputs = () => {
		posButton.disabled = (text1.value.trim() === '' || text2.value.trim() === '' || text3.value.trim() === '');
	};

	text1.addEventListener('input', checkInputs);
	text2.addEventListener('input', checkInputs);
	text3.addEventListener('input', checkInputs);

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function commentModal(childData) {

	event.preventDefault();
	var counter = false;
	var modal = document.createElement('div');

	let string = childData.tracking;
	let logistic = ``;

	if (string.includes("SPE")) {
		logistic = `https://spx.ph/detail/${childData.tracking}`;
	} else if (string.includes("P140")) {
		logistic = `https://posttrack.com/en/parcel-tracking?tracking_numbers[]=${childData.tracking}`;
	} else if  (string.includes("none")) {
		logistic = "https://spx.ph/";
	}  else {
		logistic = `https://www.trackingmore.com/track/en/${childData.tracking}?express=jtexpress-ph`;
	}


	let vButton = `<div class="img-container">
    				<img class="view-button" src="${childData.thumbnail}" alt="Description of the image">
				</div>
				
				<div class="iframe-container">
  <!-- Replace 'your-iframe-src' with the URL of the mobile version of the page you want to embed -->
  <iframe id="myIframe" src="${logistic}" frameborder="0" allowfullscreen></iframe>
</div>

				`;

	let scaption = "";
	if (childData.thumbnail === "?") {

		let myBackground = "";

		let fontSize = (childData.caption.length < 160) ? "font-size:1.4em" : "font-size:1.2em";


		if (childData.background === "") {
			myBackground = "" + ";white-space: pre-line;text-align:center; color: #444; font-weight: normal;word-wrap:break-word;padding:10px;font-size:1.3em'"
		} else {
			myBackground = childData.background + ";text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); " +
				"color: #fff;white-space: pre-line;text-align:center; font-weight: bold;" + fontSize + "; word-wrap:break-word;padding:75px; font-family: sans-serif'";
		}



		scaption = "";


	} else {
		scaption = ``;
	}

	modal.innerHTML = `

	<div>
	<table style='margin:0px'>
		<tr>
			<td rowspan='2' style='text-align:center;'>
				<img src='${profileHashMap[childData.uname]}' alt='Profile Image' width='28'
					style='border-radius: 50%;'>
			</td>
			<td>
				<span style='color:#ed4c2b;font-weight:bold;font-size: 0.7em'>${childData.uname}</span>
			</td>
		</tr>
		<tr>
			<td><span
					style='color:#808080;word-wrap: break-word;font-size: 0.6em'>${getTimeString(childData.timestamp)}</span>
			</td>
		</tr>
	</table>
</div>

<center>
	<div>

	</div>
	</div>
	${vButton}
	<section id="view-HD-button"
		style="color: #5a5a5a; font-size: 0.8em; font-weight: bold;  background-color: #f5f5f5; padding: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; cursor: pointer;display:none">
		VIEW HIGH QUALITY</section>
	
	${scaption}
	<div style="max-height: 150px; width=100%; margin-top:7.5px; overflow-y: scroll;">
		<table id="comment-table" class="tbF" align="center">
			<tbody id="comment-tb"></tbody>
		</table>
	</div>

	<div style="display: flex; align-items: center;">
		<div style="position: relative; width: calc(100%); margin-top: 5px;">
			<input id="comment-input" type="text"
				style="width: 100%; padding: 10px; padding-right: 70px;  border: 1px solid #cccccc; border-radius: 5px;"
				maxlength='140' placeholder="Write a comment...">

			<div id="comment-sticker" class="button-div"
				ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
				ontouchend="this.style.backgroundColor='transparent';"
				style="position: absolute; top: 50%; right: 35px; transform: translateY(-50%); padding: 7px;">
				<svg width="16" height="16" fill="currentColor" style="vertical-align: middle; text-align: center;"
					class="bi bi-emoji-smile" viewBox="0 0 16 16">
					<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
					<path
						d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
				</svg>
			</div>

			<div id="comment-send" class="button-div"
				ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
				ontouchend="this.style.backgroundColor='transparent';"
				style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%); padding: 7px;">
				<svg width="16" height="16" fill="currentColor" class="bi bi-send"
					style="text-align: center; vertical-align: middle;" viewBox="0 0 16 16">
					<path
						d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
				</svg>
			</div>
		</div>
	</div>



	<div class="sticker-scrollable-container" id="container-sticker">
		
		<div class="sticker-chat-buddy" id="sticker-01"><img src="mage/01.png" height="75px" alt="Hi"></div>
		<div class="sticker-chat-buddy" id="sticker-02"><img src="mage/02.png" height="75px" alt="OK"></div>
		<div class="sticker-chat-buddy" id="sticker-03"><img src="mage/03.png" height="75px" alt="Sorry"></div>
		<div class="sticker-chat-buddy" id="sticker-04"><img src="mage/04.png" height="75px" alt="Amaze"></div>
		<div class="sticker-chat-buddy" id="sticker-05"><img src="mage/05.png" height="75px" alt="Yes"></div>
		<div class="sticker-chat-buddy" id="sticker-06"><img src="mage/06.png" height="75px" alt="Thanks"></div>
		<div class="sticker-chat-buddy" id="sticker-07"><img src="mage/07.png" height="75px" alt="Heart"></div>
		<div class="sticker-chat-buddy" id="sticker-08"><img src="mage/08.png" height="75px" alt="Agree"></div>
		<div class="sticker-chat-buddy" id="sticker-09"><img src="mage/09.png" height="75px" alt="Hmm"></div>
		<div class="sticker-chat-buddy" id="sticker-10"><img src="mage/10.png" height="75px" alt="Yehey"></div>
		<div class="sticker-chat-buddy" id="sticker-11"><img src="mage/11.png" height="75px" alt="Kissy"></div>
		<div class="sticker-chat-buddy" id="sticker-12"><img src="mage/12.png" height="75px" alt="Tears"></div>
		<div class="sticker-chat-buddy" id="sticker-13"><img src="mage/13.png" height="75px" alt="Wow"></div>
		<div class="sticker-chat-buddy" id="sticker-14"><img src="mage/14.png" height="75px" alt="Hehe"></div>
		<div class="sticker-chat-buddy" id="sticker-15"><img src="mage/15.png" height="75px" alt="See you"></div>
		<div class="sticker-chat-buddy" id="sticker-16"><img src="mage/16.png" height="75px" alt="Flying kiss"></div>
		<div class="sticker-chat-buddy" id="sticker-17"><img src="mage/17.png" height="75px" alt="Music"></div>
		<div class="sticker-chat-buddy" id="sticker-18"><img src="mage/18.png" height="75px" alt="Thanks"></div>
		<div class="sticker-chat-buddy" id="sticker-19"><img src="mage/19.png" height="75px" alt="Hi"></div>
		<div class="sticker-chat-buddy" id="sticker-20"><img src="mage/20.png" height="75px" alt="Dazed"></div>
		<div class="sticker-chat-buddy" id="sticker-21"><img src="mage/21.png" height="75px" alt="I see"></div>
		<div class="sticker-chat-buddy" id="sticker-22"><img src="mage/22.png" height="75px" alt="Amazed"></div>
	</div>


	<div class='close-button'></div>
	`;

	modal.style.position = 'fixed';
	modal.style.top = '50%';
	modal.style.left = '50%';
	//modal.style.width = '90vw';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Define minimum width in pixels
	const minWidth = 330; // Adjust this value as needed

	// Check if the viewport is in landscape or portrait mode
	if (window.matchMedia("(orientation: landscape)").matches) {
		// Landscape mode (desktop)
		modal.style.width = `800px`;
	} else {
		// Portrait mode (mobile devices)
		modal.style.width = `335px`;
	}


	var closeButton = modal.querySelector('.close-button');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '101.5%';
	closeButton.style.left = '46.5%';
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';
	closeButton.style.background = 'transparent'; // remove the background image property
	closeButton.innerHTML = `<svg class="circle" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
	<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
	<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>`;
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';

	// Add overlay with grey background
	var overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
	overlay.style.zIndex = '9998';

	overlay.addEventListener('dblclick', function () {
		modal.remove();
		overlay.remove();
	});

	// Add event listener to close button
	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var viewButton = modal.querySelector('.view-button');
	var imgContainer = modal.querySelector('.img-container'); // Make sure to add a class 'container' to your container div
	var viewHDButton = modal.querySelector('#view-hd-button');

	viewButton.style.marginTop = '5px';
	viewButton.style.marginBottom = '5px';
	viewButton.style.fontWeight = 'bold';
	//viewButton.style.borderRadius = '15px';
	viewButton.style.width = '100%';
	viewButton.style.height = '100%';
	viewButton.style.objectFit = 'cover'; // This will apply the cropping effect
	console.log(childData.sessionkey);

	viewButton.addEventListener('click', function () {

		if (childData.sessionkey == 1709018661732) {
			openLink(`https://rawcdn.githack.com/louiejapps/testserver/135e58d25649cb3cdb5dc0ff711f9c0dc9d5fb5e/mage/index.html`);
		}
	});


	imgContainer.style.width = '290px'; // Set the width of your container
	imgContainer.style.height = '200px'; // Set the height of your container
	imgContainer.style.marginTop = '5px';
	imgContainer.style.marginBottom = '5px';
	imgContainer.style.overflow = 'hidden'; // Ensure content outside the container is 
	imgContainer.style.display = 'none';

	if (childData.thumbnail === "?") {
		imgContainer.style.display = `none`;
		viewHDButton.style.display = `none`;
	}

	viewHDButton.addEventListener('click', function () {
		openLink(childData.quote);
		modal.remove();
		overlay.remove();
	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var commentTB = modal.querySelector('#comment-tb');

	loadComments(childData.key, commentTB);




	var containerSticker = modal.querySelector('#container-sticker');

	var commentSend = modal.querySelector('#comment-send');
	var commentSticker = modal.querySelector('#comment-sticker');
	var commentInput = modal.querySelector('#comment-input');

	commentSend.addEventListener('click', function () {

		if (commentInput.value === "") {

		} else {
			setComment(childData.key, user, commentInput.value, "");
		}

		loadComments(childData.key, commentTB);
		commentInput.value = "";
	});

	containerSticker.style.display = "none";

	commentSticker.addEventListener('click', function () {
		if (containerSticker.style.display === 'block') {
			containerSticker.style.display = 'none';
		} else {
			containerSticker.style.display = 'block';
		}
	});


	for (let i = 1; i <= 22; i++) {
		const stickerId = i < 10 ? `0${i}` : `${i}`;
		const stickerElement = modal.querySelector(`#sticker-${stickerId}`);

		stickerElement.addEventListener('click', function () {
			containerSticker.style.display = 'none';
			setComment(childData.key, user, commentInput.value, stickerId);
			loadComments(childData.key, commentTB);
		});
	}


	document.body.appendChild(modal);
	document.body.appendChild(overlay);


	var customUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';

	// Save the original user-agent string
	var originalUserAgent = navigator.userAgent;

	// Set the custom user-agent string
	Object.defineProperty(navigator, 'userAgent', {
		value: customUserAgent,
		writable: false,
		configurable: true
	});

	// Function to restore the original user-agent string
	function restoreUserAgent() {
		navigator.userAgent = originalUserAgent;
	}

	// Find the iframe and set the fake user-agent before loading it
	var iframe = document.getElementById('myIframe');
	iframe.onload = function () {
		restoreUserAgent();
	};

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reactModal(clickX, clickY, childData) {
	//event.preventDefault();
	/*database.ref('quotes/' + childData.key).update({
		views: eval(childData.views) + eval(1)
	});*/

	// Create modal with delete button and close button

	var counter = false;
	var modal = document.createElement('div');
	let myAuthor = "<b style='color:#ed4c2b;'>" + childData.uname + "</b>";
	let dButton = "<a class='delete-button'>&nbsp; Delete  &nbsp;</a>";
	let pButton = "<a class='pin-button'>&nbsp; Pin Post &nbsp;</a>";

	let rButton = `
    <table border='0' id='reactTable'>
        <tr>
            <td>
                <div id="c-loves" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='loves'
                        style='font-size: 1em; font-weight: bold; color: red;'>❤️</span><br></div>
            </td>
            <td>
                <div id="c-likes" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='likes'
                        style='font-size: 1em; font-weight: bold; color: red;'>👍</span></div>
            </td>
            <td>
                <div id="c-wows" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='wows'
                        style='font-size: 1em; font-weight: bold; color: red;'>🔥</span></div>
            </td>
            <td>
                <div id="c-hahas" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='hahas'
                        style='font-size: 1em; font-weight: bold; color: red;'>😂</span></div>
            </td>
            <td>
                <div id="c-frowns" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='frowns'
                        style='font-size: 1em; font-weight: bold; color: red;'>😥</span></div>
            </td>
            <td>
                <div id="c-dislikes" class="button-div" ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
                    ontouchend="this.style.backgroundColor='transparent';"><span id='dislikes'
                        style='font-size: 1em; font-weight: bold; color: red;'>👎</span></div>
            </td>
        </tr>
    </table>	
	`;



	modal.innerHTML = `<div style="text-align:center">${rButton}
		<a class='remove-button'>Remove</a>
		<div class='close-button'>
		</div></div>`;


	modal.style.position = 'fixed';
	modal.style.top = eval(clickY - 50) + 'px';
	modal.style.left = '50%';
	modal.style.width = '330px';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '15px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Style close button
	var closeButton = modal.querySelector('.close-button');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '1%';
	closeButton.style.left = '88%';
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';
	closeButton.style.display = 'none';
	closeButton.style.background = 'transparent'; // remove the background image property
	closeButton.innerHTML = `<svg class="circle" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
	<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
	<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>`;
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';

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

	var remButton = modal.querySelector('.remove-button');
	remButton.style.color = '#ccc';
	remButton.style.cursor = 'pointer';

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	remButton.addEventListener('click', function () {
		toggleLike("", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);
	});

	var cLoves = modal.querySelector('#c-loves');
	cLoves.addEventListener('click', function () {
		toggleLike("loves", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);

	});

	var cLikes = modal.querySelector('#c-likes');
	cLikes.addEventListener('click', function () {
		toggleLike("likes", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);
	});

	var cHahas = modal.querySelector('#c-hahas');
	cHahas.addEventListener('click', function () {
		toggleLike("hahas", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);
	});

	var cWows = modal.querySelector('#c-wows');
	cWows.addEventListener('click', function () {
		toggleLike("wows", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);
	});

	var cFrowns = modal.querySelector('#c-frowns');
	cFrowns.addEventListener('click', function () {
		toggleLike("frowns", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);
	});

	var cDislikes = modal.querySelector('#c-dislikes');
	cDislikes.addEventListener('click', function () {
		toggleLike("dislikes", childData.key, user);
		setTimeout(function () {
			modal.remove();
			overlay.remove();
		}, 1000);

	});

	overlay.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});


	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	firebase.database().ref(`quotes/${childData.key}/react/${user}`).once('value', function (snapshot) {
		// Get the value from the snapshot using val()
		var snapshotValue = snapshot.val();
		toggleLike(snapshotValue, childData.key, user);

		// Now, you can use snapshotValue as the data retrieved from the database
		console.log(snapshotValue);
	});

	setTimeout(function () {
		modal.remove();
		overlay.remove();
	}, 2000);
}



































function menuModal(clickX, clickY, childData) {
	event.preventDefault();
	/*database.ref('quotes/' + childData.key).update({
		views: eval(childData.views) + eval(1)
	});*/

	// Create modal with delete button and close button

	var counter = false;
	var modal = document.createElement('div');
	let rButton = `
    <div id="del-post" class="button-div" style="padding:7.5px"
        ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
        ontouchend="this.style.backgroundColor='transparent';">
        <span id="delpost-span" style="color: #C34632; font-size:1.3em">Delete (Admin)</span>
    </div>
	
    <div id="pin-post" class="button-div" style="padding:7.5px"
        ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
        ontouchend="this.style.backgroundColor='transparent';">
        <span id="pinpost-span" style="color: lightgray; padding:10px; font-size:1.3em" disabled>Pin Post </span>
    </div>

	<div id="edit-post" class="button-div" style="padding:7.5px"
        ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
        ontouchend="this.style.backgroundColor='transparent';">
        <span id="editpost-span" style="color: #1a1a1a; font-size:1.3em">Edit (Admin)</span>
    </div>

    <div id="rep-post" class="button-div" style="padding:7.5px"
        ontouchstart="this.style.backgroundColor='rgba(211, 211, 211, 0.7)';"
        ontouchend="this.style.backgroundColor='transparent';">
        <span style="color: lightgray; padding:10px; font-size:1.3em">Report </span>
    </div>
	`;

	modal.innerHTML = `<div style="text-align:center">${rButton}
		<div class='close-button'>
		</div></div>`;


	modal.style.position = 'fixed';
	modal.style.top = '45%';
	modal.style.left = '50%';
	modal.style.width = '300px';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.paddingTop = '25px';
	modal.style.paddingBottom = '25px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Style close button
	var closeButton = modal.querySelector('.close-button');
	closeButton.style.position = 'absolute';
	closeButton.style.top = '108%';
	closeButton.style.left = '46.5%';
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';
	closeButton.style.display = 'none';

	closeButton.style.background = 'transparent'; // remove the background image property
	closeButton.innerHTML = `<svg class="circle" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
	<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
	<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>`;
	closeButton.style.fontSize = '35px';
	closeButton.style.cursor = 'pointer';

	// Add overlay with grey background
	var overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
	overlay.style.zIndex = '9998';


	let delPost = modal.querySelector('#del-post');
	let pinPost = modal.querySelector('#pin-post');
	let repPost = modal.querySelector('#rep-post');
	let editPost = modal.querySelector('#edit-post');
	let delSpan = modal.querySelector('#delpost-span');
	let pinSpan = modal.querySelector('#pinpost-span');

	pinPost.style.color = `lightgray`;

	if (childData.pinned) {
		delPost.style.display = 'none';
		repPost.style.display = 'none';
		pinSpan.style.color = '#C34632';
		pinSpan.innerHTML = `Unpin Post`;
	}

	editPost.addEventListener('click', function () {
		if (user === `Admin`) {
			let userInput = prompt("Tracking number");
			newTracking(childData.key, userInput);
		}
	});


	delPost.addEventListener('dblclick', function () {
		/*if (!counter) {
			delSpan.innerHTML = "&#x2713; Confirm Delete";
			pinPost.style.display = 'none';
			repPost.style.display = 'none';
			counter = true;
		} else {

			database.ref('quotes/' + childData.key).remove()
				.then(() => {
					console.log("Data successfully deleted");
				})
				.catch((error) => {
					console.log("Error deleting data:", error);
				});
			modal.remove();
			overlay.remove();
			notif.style.display = "none";

		}*/
		if (user === `Admin`) {
			database.ref('quotes/' + childData.key).remove()
				.then(() => {
					console.log("Data successfully deleted");
				})
				.catch((error) => {
					console.log("Error deleting data:", error);
				});
			modal.remove();
			overlay.remove();
		}

	});

	pinPost.addEventListener('click', function () {
		/*if (!counter) {
			if (childData.pinned) {
				pinSpan.innerHTML = `<svg width="12" height="12" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
			<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
		  </svg> Confirm Unpin`;
			} else {
				pinSpan.innerHTML = `<svg width="12" height="12" fill="currentColor" class="bi bi-pin-fill" viewBox="0 0 16 16">
					<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
				  </svg> Pin Post?`;
			}
			delPost.style.display = 'none';
			repPost.style.display = 'none';
			counter = true;
		} else {
			togglePin(childData.key);
			modal.remove();
			overlay.remove();
			notif.style.display = "none";

		}
		*/
	});

	repPost.addEventListener('click', function () {

	});

	// Add event listener to close button
	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	overlay.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

}
























function thoughtModal(mythought) {
	sessionStorage.setItem("link", "?");
	sessionStorage.setItem("base64", "");
	rnum = "";

	upflag = false;
	var modal = document.createElement('div');

	let myAuthor = "<big><b style='color:#ed4c2b;'>" + "My Thoughts" + "</b></big>";
	let imgButton = "<input type='file' id='img-button' onchange='handleImage()' accept='image/*'>";
	let postButton = "<button class='view-button' id='post-button'>POST</button>";
	let htmlString = `
	
			<textarea id='caption' style="min-height:80px" name='caption' maxlength='32' placeholder='Write something...'></textarea>
			`;
	modal.innerHTML = "<center><div><p>" + myAuthor + "" +
		"</div></div>" + imgButton + htmlString + postButton + "<a class='remove-button' style='color:lightgray'>Delete Thought</a><div class='close-button'></div>";

	modal.style.position = 'fixed';
	modal.style.top = '36%';
	modal.style.left = '50%';
	//modal.style.width = '90vw';
	modal.style.height = 'auto';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'white';
	modal.style.padding = '20px';
	modal.style.border = '1px #aaa';
	modal.style.borderRadius = '10px';
	modal.style.zIndex = '9999';

	// Define minimum width in pixels
	const minWidth = 330; // Adjust this value as needed

	// Check if the viewport is in landscape or portrait mode
	if (window.matchMedia("(orientation: landscape)").matches) {
		// Landscape mode (desktop)
		modal.style.width = `420px`;
	} else {
		// Portrait mode (mobile devices)
		modal.style.width = `320px`;
	}

	var captionArea = modal.querySelector('#caption');

	if (mythought !== "") {
		captionArea.disabled = true;
		captionArea.textContent = `"${mythought}"`;
		captionArea.style.border = `none`;
		captionArea.style.textAlign = `center`;
		captionArea.style.paddingTop = '30px';
	}

	var remButton = modal.querySelector('.remove-button');
	remButton.style.color = '#ccc';
	remButton.style.cursor = 'pointer';

	remButton.addEventListener('click', function () {
		if (captionArea.value !== "") {
			var quoteRef = database.ref(`users/Admin/thoughts`);
			quoteRef.set("");
			modal.remove();
			overlay.remove();
		}
	});



	var closeButton = modal.querySelector('.close-button');
	closeButton.style.cssText = `
    	position: absolute;
    	top: 103%;
    	left: 46.5%;
    	font-size: 35px;
    	cursor: pointer;
    	background: transparent;
    	font-size: 35px;
    	cursor: pointer;`;
	closeButton.innerHTML = `<svg class="circle" width="32" height="32" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
		<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
	  </svg>`;

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	var overlay = document.createElement('div');
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.85);
		z-index: 9998;
	`;

	let posButton = modal.querySelector('#post-button');
	posButton.style.cssText = `
		margin-top: 10px;
		margin-bottom: 15px;
		font-weight: bold;
		border-radius: 15px;
		width: 100%;
	`;
	posButton.disabled = true;

	closeButton.addEventListener('click', function () {
		modal.remove();
		overlay.remove();
	});

	// Add modal and overlay to the page
	document.body.appendChild(modal);
	document.body.appendChild(overlay);

	//POSTBUTTON
	//POSTBUTTON

	posButton.addEventListener('click', function () {
		if (captionArea.value !== "") {
			var quoteRef = database.ref(`users/Admin/thoughts`);
			quoteRef.set(captionArea.value);
			modal.remove();
			overlay.remove();
		}
	});

	var Textarea = document.querySelector('#caption');

	Textarea.addEventListener('input', function () {
		// Check if the textarea is not empty
		if (Textarea.value.trim() !== '') {
			// Enable the button
			posButton.disabled = false;
		} else {
			// Disable the button if the textarea is empty
			posButton.disabled = true;
		}
	});
}
