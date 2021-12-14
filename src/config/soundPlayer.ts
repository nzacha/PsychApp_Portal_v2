const tap1 = require('../media/static/sounds/wav/PrimarySystemSounds/ui_tap-variant-01.wav');
const tap2 = require('../media/static/sounds/wav/PrimarySystemSounds/ui_tap-variant-02.wav');
const tap3 = require('../media/static/sounds/wav/PrimarySystemSounds/ui_tap-variant-03.wav');
const tap4 = require('../media/static/sounds/wav/PrimarySystemSounds/ui_tap-variant-04.wav');

const tapSounds = [new Audio(tap1.default), new Audio(tap2.default), new Audio(tap3.default), new Audio(tap4.default)];
let tapSoundIndex = 0;
export const playTapSound = () => {
    tapSounds[tapSoundIndex].play().then(e => {tapSoundIndex = (tapSoundIndex+1) % tapSounds.length}).catch(e => {});
}