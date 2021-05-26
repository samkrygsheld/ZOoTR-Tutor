'use strict';

import { Item, ItemState } from './models.js';
// import { parseSettingsString } from './util.js';
// parseSettingsString('AJTWFCBSKJA9EFSDEAAJACBBMTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEAN3BAJAAWKCLAC');
// parseSettingsString('AJTWFCBSKJA9EFSDEAAJACBBMTDDAKAAJAESBSAGAC6SKSC2SC3JHLUVNFBAMQAACAAPUSCS');

let saveData = {};

function loadState() {
    saveData = JSON.parse(localStorage.getItem('saveData')) || {};
}

function saveState() {
    localStorage.setItem('saveData', JSON.stringify(saveData));
}

function setUpServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(() => {
            console.log('service worker registered');
        });
    }
}

// const titleizeWord = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// function titleize(str) {
//     return str.split(' ').map((word) => titleizeWord(word)).join(' ');
// }

$(() => {
    setUpServiceWorker();
    loadState();

    const itemStates = {};

    $('.itemButton, .songButton, #age').each((_, img) => {
        img.title = img.alt = img.id;
        const $img = $(img);
        const itemState = new ItemState(new Item(img.id, $img.data('maxiter')+1), img);
        itemState.setState(saveData[img.id] || 0);
        itemStates[img.id] = itemState;
        $img.click(() => {
            itemStates[img.id].incrementState();
            saveData[img.id] = itemStates[img.id].state;
            saveState();
        }).contextmenu((e) => {
            itemStates[img.id].decrementState();
            saveData[img.id] = itemStates[img.id].state;
            saveState();

            e.preventDefault();
        });
    });

    $('.songButton').bind('mouseenter touchstart', (e) => {
        const songNotes = e.target.dataset.notes;
        for (let i = 0; i < songNotes.length; i++) {
            $(`#note${i}`).attr('src', `assets/images/music/note-${songNotes[i]}.png`);
        }
    }).bind('mouseleave contextmenu', () => {
        $('.note').each((_, note) => {
            note.src = '';
        });
    });

    $('#mapSvg > path').click((e) => {
        $('#mapLocation').text(e.target.id.replaceAll('_', ' '));
        // Zoom in if you can, else show checks
        // const $path = $(e.target);
    }).contextmenu((e) => {
        // Zoom out if you can
        e.preventDefault();
    });


});