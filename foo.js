'use strict'

window.onload = () => {
    const body = document.body;   
    body.onkeypress = keyboardShortcuts;
    makeKeyboard(body);
}

function makeKeyboard(parent) {
    [
        ['z', 'C4'],
        ['s', 'C#4'],
        ['x', 'D4'],
        ['d', 'D#4'],
        ['c', 'E4'],
        ['v', 'F4'],
        ['g', 'F#4'],
        ['b', 'G4'],
        ['h', 'G#4'],
        ['n', 'A4'],
        ['j', 'A#4'],
        ['m', 'B4'],
        [',', 'C5'],
    ].forEach(k => {
        parent.appendChild(makeButton(k[0], k[1]));
    });
}

function keyboardShortcuts(ev) {
    if( keyboardMap[ev.key]) {
        keyboardMap[ev.key]();
        return;
    }
    switch( ev.key) {
        case 'z':
            bonkButton();
            break;
        default:
            break;
    }
}

const keyboardMap = {};

function registerKeyboardShortcut(callback, key) {
    keyboardMap[key] = callback;
}

const makeButton = (key, note) => {
    
    const element = document.createElement('button');
    element.className = ['key'];
    if( note.includes('#')) {
        element.className += ' blackKey';
    } else {
        element.className += ' whiteKey';
    }
    element.innerHTML = `${key} - ${note}`;
    element.onclick = () => {
        // TODO don't just make these constantly
        const synth = new Tone.Synth().toMaster();
        synth.triggerAttackRelease(note, '8n');
    }
    registerKeyboardShortcut(element.onclick, key);

    return element;
}