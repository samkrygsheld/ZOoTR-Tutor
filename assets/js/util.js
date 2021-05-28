// 32 characters
const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const index_to_letter = [...letters];
const letter_to_index = index_to_letter.reduce((obj, l, i) => {
    obj[l] = i;
    return obj;
}, {});

function text_to_bit_string(text) {
    const bits = [];
    for (let c of text) {
        const index = letter_to_index[c];
        for (let b = 0; b < 5; b++) {
            bits.push([ (index >> b) & 1 ]);
        }
    }
    return bits;
}

export async function parseSettingsString(text) {
    const setting_infos = await (await fetch('assets/js/test.json')).json();
    let bits = text_to_bit_string(text);

    const settings = {};
    for (const setting of setting_infos.filter(s => s.shared && s.bitwidth > 0)) {
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
                value = value * setting.gui_params.step || 1;
                value = value + setting.gui_params.min || 0;
                break;
            }
            case 'list': {
                value = [];
                let maxIndex = (1 << setting.bitwidth) - 1;
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