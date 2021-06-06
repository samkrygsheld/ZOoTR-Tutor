'use strict';

import { Check, CheckState, Item, ItemState } from './models.js';
import { fetchJson, isMobile, titleize } from './utils.js';
// import { parseSettingsString } from './utils.js';
// parseSettingsString('AJTWFCBSKJA9EFSDEAAJACBBMTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEAN3BAJAAWKCLAC');
// parseSettingsString('AJTWFCBSKJA9EFSDEAAJACBBMTDDAKAAJAESBSAGAC6SKSC2SC3JHLUVNFBAMQAACAAPUSCS');

// let saveData = {
//     inventory: {},
//     checks: {},
// };

// function loadState() {
//     saveData = JSON.parse(localStorage.getItem('saveData')) || saveData;
//     saveData.inventory = saveData.inventory || {};
//     saveData.checks = saveData.checks || {};
// }

// function saveState() {
//     localStorage.setItem('saveData', JSON.stringify(saveData));
// }

// function setUpServiceWorker() {
//     // Disable service worker without causing linter errors :P
//     // Look into using Workbox eventually
//     if ('serviceWorker' in navigator && ''.length) {
//         navigator.serviceWorker.register('service-worker.js').then(() => {
//             console.log('service worker registered');
//         });
//     }
// }

$(async () => {
    setUpServiceWorker();
    loadState();

    const itemStates = {};

    // $('.itemButton, .songButton, #age').each((_, img) => {
    //     img.title = img.alt = img.id;
    //     const $img = $(img);
    //     const maxIter = $img.data('maxiter');
    //     const itemState = new ItemState(new Item(img.id, maxIter + 1), img, maxIter === 1);
    //     itemState.setState(saveData.inventory[img.id] || 0);
    //     itemStates[img.id] = itemState;
    //     $img.click(() => {
    //         itemStates[img.id].incrementState();
    //         saveData.inventory[img.id] = itemStates[img.id].state;
    //         saveState();
    //     }).contextmenu((e) => {
    //         itemStates[img.id].decrementState();
    //         saveData.inventory[img.id] = itemStates[img.id].state;
    //         saveState();

    //         e.preventDefault();
    //     });
    // });

    // $('.songButton').bind('mouseenter touchstart', (e) => {
    //     const songNotes = e.target.dataset.notes;
    //     for (let i = 0; i < songNotes.length; i++) {
    //         $(`#note${i}`).attr('src', `assets/images/music/note-${songNotes[i]}.png`);
    //     }
    // }).bind('mouseleave contextmenu', () => {
    //     $('.note').each((_, note) => {
    //         note.src = '';
    //     });
    // });

    // $('#checks').resizable({
    //     disabled: isMobile(),
    //     handles: 'e',
    //     minWidth: 180,
    //     maxWidth: 900,
    //     resize: (event, ui) => {
    //         ui.element.css({ 'flex-basis': ui.size.width + 10 });
    //     }
    // });

    // $('#mapSvg > path').click(() => {
    //     // $('#mapLocation').text(titleize(e.target.id.replaceAll('_', ' ')));
    //     // Zoom in if you can, else show checks
    //     // const $path = $(e.target);
    // }).contextmenu((e) => {
    //     // Zoom out if you can
    //     e.preventDefault();
    // }).mouseenter((e) => {
    //     const $tooltipTemplate = $(document.getElementById('map-tooltip-tmpl').content.firstElementChild).clone();
    //     $(document.body).append($tooltipTemplate);
    //     $tooltipTemplate.text(titleize(e.target.id.replaceAll('_', ' ')));
    //     $tooltipTemplate.css({
    //         transform: `translate(${e.pageX}px, ${e.pageY}px)`,
    //         top: -$tooltipTemplate.outerHeight() - 5,
    //     });
    // }).mousemove((e) => {
    //     $('.map-tooltip').css({ transform: `translate(${e.pageX}px, ${e.pageY}px)` });
    // }).mouseleave(() => {
    //     $('.map-tooltip').remove();
    // });

    const checks = await fetchJson('assets/js/checks.json');

    for (const check of checks) {
        const checkState = new CheckState(new Check(check), saveData.checks[check.spoiler]);
        const $clonedTemplate = $(document.getElementById('check-row-tmpl').content.firstElementChild).clone();
        $clonedTemplate.addClass(checkState.class);
        $clonedTemplate.children('.check-name').text(check.description);
        $clonedTemplate.children('.check-icons').text(checkState.check.icons);
        $clonedTemplate.click(() => {
            checkState.checked = !checkState.checked;
            saveData.checks[checkState.check.spoiler] = checkState.checked;
            saveState();
            $clonedTemplate.removeClass();
            $clonedTemplate.addClass(checkState.class);
        });
        $('#checks').children('ul').append($clonedTemplate);
    }

    if (isMobile()) {
        $('#checksWrapper').addClass('hidden');
    }
    let showChecks = false;
    $(window).resize(() => {
        showChecks = false;
        $('#inventoryTracker').removeClass('hidden');
        $('#checksWrapper').removeClass('hidden');
        if (isMobile()) {
            $('#checksWrapper').addClass('hidden');
        }
        $('#checks').removeAttr('style').resizable({
            disabled: isMobile(),
        });
    });
    let lastScrollTop = 0;
    $('#checks').children('ul').scroll((e) => {
        if (!isMobile()) {
            return;
        }
        const scrollTop = e.target.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Down
            $('#toggleMap').fadeOut(250);
        } else {
            $('#toggleMap').fadeIn(250);
        }
        lastScrollTop = scrollTop;
    });
    $('#toggleMap').click(() => {
        showChecks = !showChecks;
        if (showChecks) {
            $('#inventoryTracker').addClass('hidden');
            $('#checksWrapper').removeClass('hidden');
        } else {
            $('#inventoryTracker').removeClass('hidden');
            $('#checksWrapper').addClass('hidden');
            $('#toggleMap').stop(true, true).show();
        }
    });

});
