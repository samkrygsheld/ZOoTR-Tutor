import { StorageService } from './storage.service';
import { Check, CheckState, Item, ItemState } from './models';
import { fetchJson, isMobile, titleize } from './utils';

export async function main() {
  const $storage = new StorageService();

  $<HTMLImageElement>('.itemButton, .songButton, #age').each((_, img) => {
    img.title = img.alt = img.id;
    const $img = $(img);
    const maxIter = $img.data('maxiter');
    const itemState = new ItemState(
      new Item(img.id, maxIter + 1),
      img,
      maxIter === 1
    );
    itemState.setState($storage.saveData.inventory[img.id] || 0);
    $img
      .on('click', () => {
        itemState.incrementState();
        $storage.saveData.inventory[img.id] = itemState.state;
        $storage.saveState();
      })
      .on('contextmenu', (e) => {
        itemState.decrementState();
        $storage.saveData.inventory[img.id] = itemState.state;
        $storage.saveState();

        e.preventDefault();
      });
  });

  $('.songButton')
    .on('mouseenter touchstart', (e) => {
      const songNotes = e.target.dataset.notes;
      if (songNotes) {
        for (let i = 0; i < songNotes.length; i++) {
          $(`#note${i}`).attr(
            'src',
            `images/music/note-${songNotes[i]}.png`
          );
        }
      }
    })
    .on('mouseleave contextmenu', () => {
      $<HTMLImageElement>('.note').each((_, note) => {
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
        }
    });

    $('#mapSvg > path').on('click', () => {
        // $('#mapLocation').text(titleize(e.target.id.replaceAll('_', ' ')));
        // Zoom in if you can, else show checks
        // const $path = $(e.target);
    }).on('contextmenu', (e) => {
        // Zoom out if you can
        e.preventDefault();
    }).on('mouseenter', (e) => {
        const $tooltipTemplate = $((document.getElementById('map-tooltip-tmpl') as HTMLTemplateElement).content.firstElementChild!).clone();
        $(document.body).append($tooltipTemplate);
        $tooltipTemplate.text(titleize(e.target.id.replaceAll('_', ' ')));
        $tooltipTemplate.css({
            transform: `translate(${e.pageX}px, ${e.pageY}px)`,
            top: -$tooltipTemplate.outerHeight()! - 5,
        });
    }).on('mousemove', (e) => {
        $('.map-tooltip').css({ transform: `translate(${e.pageX}px, ${e.pageY}px)` });
    }).on('mouseleave', () => {
        $('.map-tooltip').remove();
    });



    const checks = await fetchJson('js/checks.json');

    for (const check of checks) {
        const checkState = new CheckState(new Check(check), $storage.saveData.checks[check.spoiler]);
        const $clonedTemplate = $((document.getElementById('check-row-tmpl') as HTMLTemplateElement).content.firstElementChild!).clone();
        $clonedTemplate.addClass(checkState.class);
        $clonedTemplate.children('.check-name').text(check.description);
        $clonedTemplate.children('.check-icons').text(checkState.check.icons);
        $clonedTemplate.click(() => {
            checkState.checked = !checkState.checked;
            $storage.saveData.checks[checkState.check.spoiler] = checkState.checked;
            $storage.saveState();
            $clonedTemplate.removeClass();
            $clonedTemplate.addClass(checkState.class);
        });
        $('#checks').children('ul').append($clonedTemplate);
    }

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
    $('#checks').children('ul').on('scroll', (e) => {
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
}
