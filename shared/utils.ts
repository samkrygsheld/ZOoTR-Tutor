// 32 characters
const letters: string = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const index_to_letter = [...letters];
const letter_to_index = index_to_letter.reduce(
  (obj: { [idx: string]: number }, l, i) => {
    obj[l] = i;
    return obj;
  },
  {}
);

function text_to_bit_string(text: string) {
  const bits = [];
  for (const c of text) {
    const index = letter_to_index[c];
    for (let b = 0; b < 5; b++) {
      bits.push((index >> b) & 1);
    }
  }
  return bits;
}

const titleizeWord = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
export function titleize(str: string): string {
  return str.split(' ').map(titleizeWord).join(' ');
}

function delimToCamel(str: string, delim: string) {
  const words = str.split(delim);
  return [words[0], ...words.slice(1).map(titleizeWord)].join('');
}

export function snakeToCamel(str: string): string {
  return delimToCamel(str, '_');
}

export function kebabToCamel(str: string): string {
  return delimToCamel(str, '-');
}

export function isMobile(): boolean {
  return window.matchMedia('only screen and (max-width: 900px)').matches;
}

export async function fetchJson<T = any>(url: string): Promise<T> {
  return (await fetch(url)).json();
}

import randoData from '../public/js/randomizer-data.json';

export function parseSettingsString(text: string): void {
  let bits = text_to_bit_string(text);

  // let settings: Pick<typeof randoData[0], 'name'>;
  const settings: JSONObject = {};
  for (const setting of randoData.filter((s) => s.shared && s.bitwidth > 0)) {
    let curBits = bits.slice(0, setting.bitwidth);
    bits = bits.slice(setting.bitwidth);
    let value = null;
    switch (setting.type) {
      case 'bool': {
        value = !!curBits[0];
        break;
      }
      case 'str': {
        let index = 0;
        for (let b = 0; b < setting.bitwidth; b++) {
          index |= curBits[b] << b;
        }
        value = setting.choice_list[index];
        break;
      }
      case 'int': {
        value = 0;
        for (let b = 0; b < setting.bitwidth; b++) {
          value |= curBits[b] << b;
        }
        value = value * (setting.gui_params.step || 1);
        value = value + (setting.gui_params.min || 0);
        break;
      }
      case 'list': {
        value = [];
        const maxIndex = (1 << setting.bitwidth) - 1;
        for (;;) {
          let index = 0;
          for (let b = 0; b < setting.bitwidth; b++) {
            index |= curBits[b] << b;
          }

          if (index === 0) {
            break;
          }
          if (index == maxIndex) {
            value = [];
            break;
          }

          value.push(setting.choice_list[index - 1]);
          curBits = bits.slice(0, setting.bitwidth);
          bits = bits.slice(setting.bitwidth);
        }
        break;
      }
    }
    settings[setting.name] = value;
  }

  console.log(settings);

  // self.settings_string = self.get_settings_string()
  // self.numeric_seed = self.get_numeric_seed()
}
