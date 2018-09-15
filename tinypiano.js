'use strict'

window.onload = () => {
    const body = document.body;   
    body.onkeypress = keyboardShortcuts;
    makeKeyboard(body, keyboardTrigger, 3);
}

function makeKeyboard(parent, trigger, octave) {
    // TODO change note param to makeKeyboardKey take a function for dynamic octave change
    const oct = (note) => `${note}${octave}`;
    [
        ['z', oct('C')],
        ['s', oct('C#')],
        ['x', oct('D')],
        ['d', oct('D#')],
        ['c', oct('E')],
        ['v', oct('F')],
        ['g', oct('F#')],
        ['b', oct('G')],
        ['h', oct('G#')],
        ['n', oct('A')],
        ['j', oct('A#')],
        ['m', oct('B')],
        [',', `C${octave+1}`], // this is what i was trying to avoid :(
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


const synth = new Tone.PolySynth().toMaster();

function keyboardTrigger(note) {
    synth.triggerAttackRelease(note, '8n');
}