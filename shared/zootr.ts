import { StorageService } from './storage.service';
import { Check, CheckState, Item, ItemState } from './models';
import { fetchJson, isMobile } from './utils';

export async function main(currentMap: string): Promise<CheckState[]> {
  const $storage = StorageService.Instance;

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

  if (isMobile()) {
    $('#checksWrapper').addClass('hidden');
  }
  let showChecks = false;
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

  const checks = await fetchJson('js/checks.json');
  const regions = await fetchJson('js/regions.json');

  let subregion: string | null = currentMap;
  console.log('SVG ID:', subregion);
  const region = regions.filter((r: any) => r.region === subregion)[0];
  let subs: any[] = [];
  console.log(region);
  if (region != null) {
    subs = region.subregions;
  } else {
    subregion = null;
  }
  return checks.filter(
    (c: any) =>
      c.subregion === subregion ||
      Object.keys(subs).some((s) => c.subregion == s)
  ).map((check: any) => new CheckState(
    new Check(check),
    $storage.saveData.checks[check.spoiler]
  ));
}
