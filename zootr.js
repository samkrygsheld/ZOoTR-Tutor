function toggleAge() {
    img = document.getElementById("ageIndicator");
	console.log(img.src);
	if (img.src.endsWith('linkchild.png')) {
		img.src = 'Images/linkadult.png';
	}
	else {
		img.src = 'Images/linkchild.png';
	};
}

function incrementItem(obj) {
	var pathNoExtension = obj.src.slice(0,-4)
	var itemNumber = pathNoExtension.match(/\d+$/)[0];
	var newNumber = parseInt(itemNumber)+1;
	if (newNumber > obj.dataset.maxiter) {
		newNumber = 0
	}
	if (itemNumber.length == 2) {
		obj.src = pathNoExtension.slice(0,-2)+newNumber.toString()+'.png'
	}
	else {
		obj.src = pathNoExtension.slice(0,-1)+newNumber.toString()+'.png'
	};
}

function hideSong() {
	var notes = document.querySelectorAll('.note');
	for (var i = 0; i < notes.length; i++) {
		notes[i].src = ""
	};
}

function showSong(obj) {
	var songNotes = obj.dataset.notes;
	for (var i = 0; i < songNotes.length; i++) {
		document.getElementById("note"+i).src = 'Images/Music/note-'+songNotes[i]+'.png'
	};
}