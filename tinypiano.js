'use strict'

window.onload = () => {
    const body = document.body;   
    body.onkeypress = keyboardShortcuts;
    makeKeyboard(body, keyboardTrigger);
}

function makeKeyboard(parent, trigger) {
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
        parent.appendChild(makeKeyboardKey(k[0], k[1], trigger));
    });
}

function keyboardShortcuts(ev) {
    if( keyboardMap[ev.key]) {
        keyboardMap[ev.key](ev);
        return;
    }
    switch( ev.key) {
        default:
            break;
    }
}

const keyboardMap = {};

function registerKeyboardShortcut(callback, key) {
    keyboardMap[key] = callback;
}

const makeKeyboardKey = (key, note, trigger) => {
    const element = document.createElement('button');
    element.classList.add('key');
    const keyColor = note.includes('#') ? 'blackKey' : 'whiteKey';
    element.classList.add(keyColor);
    element.innerHTML = `${note}<br><br>(${key})`;
    element.onclick = () => {
        trigger(note);
    }
    registerKeyboardShortcut((ev)=>{
        if( ev.repeat) {
            return;
        }
        element.classList.add('keyPress');
        element.addEventListener('animationend', ()=>{
            element.classList.remove('keyPress') 
        }, {once:true});
        trigger(note);
    }, key);
    return element;
}


const synth = new Tone.Synth().toMaster();

function keyboardTrigger(note) {
    synth.triggerAttackRelease(note, '8n');
}