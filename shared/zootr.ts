import { isMobile } from './utils';

let showChecks = false;
let init = false;
export function main(): void {
  if (init) {
    return;
  }

  init = true;

  $('[data-notes]')
    .on('mouseenter touchstart', (e) => {
      const songNotes = e.target.dataset.notes;
      if (songNotes) {
        for (let i = 0; i < songNotes.length; i++) {
          $(`#note${i}`).attr('src', `images/music/note-${songNotes[i]}.png`);
        }
      }
    })
    .on('mouseleave contextmenu', () => {
      $<HTMLImageElement>('[id^=note]').each((_, note) => {
        note.src = '';
      });
    });

  $('#checks').resizable({
    disabled: isMobile(),
    handles: 'e',
    minWidth: 180,
    maxWidth: 900,
    resize: (event, ui) => {
      ui.element.css({ 'flex-basis': ui.size.width + 10 });
    },
  });

  if (isMobile() && showChecks === false) {
    $('#checksWrapper').addClass('hidden');
  }
  $(window).off('resize');
  $(window).on('resize', () => {
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
  $('#checks')
    .children('ul')
    .off('scroll');
  $('#checks')
    .children('ul')
    .on('scroll', (e) => {
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
  $('#toggleMap').off('click');
  $('#toggleMap').on('click', () => {
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
}
