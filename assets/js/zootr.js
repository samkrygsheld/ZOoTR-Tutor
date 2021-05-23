let state = {};

function loadState() {
    state = JSON.parse(localStorage.getItem('state')) || {};
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(state));
}

// Replace with img.id below
function getItemName(img) {
    const pathNoExtension = img.src.slice(0,-4);
    const filename = pathNoExtension.substring(pathNoExtension.lastIndexOf('/') + 1)
    const match = filename.match(/(.*?)\d+$/);
    if (match) {
        return match[1];
    }
    return filename;
}

function setItemState(obj, state) {
    const pathNoExtension = obj.src.slice(0,-4);
    const match = pathNoExtension.match(/(.*?)\d+$/);
    if (!match) {
        return;
    }
    const [_, path] = match;
    obj.src = `${path}${state}.png`;
}

function incrementItem(obj, step = 1) {
    // TODO: Make this DRY
    const pathNoExtension = obj.src.slice(0,-4);
    const [_, path, itemNumber] = pathNoExtension.match(/(.*?)(\d+)$/);
    let newNumber = parseInt(itemNumber) + step;
    if (newNumber > obj.dataset.maxiter) {
        newNumber = obj.dataset.maxiter;
    } else if (newNumber < 0) {
        newNumber = 0;
    }
    obj.src = `${path}${newNumber}.png`;
    const [_2, filename] = pathNoExtension.substring(pathNoExtension.lastIndexOf('/') + 1).match(/(.*?)\d+$/);
    state[filename] = newNumber;
    saveState();
}

function hideSong() {
    const notes = document.querySelectorAll('.note');
    for (let i = 0; i < notes.length; i++) {
        notes[i].src = '';
    }
}

function showSong(obj) {
    const songNotes = obj.dataset.notes;
    for (let i = 0; i < songNotes.length; i++) {
        document.getElementById(`note${i}`).src = `assets/images/music/note-${songNotes[i]}.png`;
    }
}

function test(obj) {
	console.log(obj.alt);
}

function setUpServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('assets/js/sw.js').then(() => {
            console.log('service worker registered');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setUpServiceWorker();
    loadState();

    $('.itemButton, .songButton').each((_, img) => {
        // Replace getting item source with id's that we set. Temporarily parsing from url
        let itemName = getItemName(img);
        setItemState(img, state[itemName] || 0);
        img.addEventListener('contextmenu', (e) => {
            incrementItem(img, -1);
            e.preventDefault();
        });
    });

    $('#mapSvg > path').click((e) => {
        $('#mapLocation').text(e.target.id.replaceAll('_', ' '));
        // Zoom in if you can, else show checks
        const $path = $(e.target);
    }).contextmenu((e) => {
        // Zoom out if you can
        e.preventDefault();
    });
}, false);