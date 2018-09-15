'use strict'

window.onload = () => {
    const body = document.body;
    const button = document.createElement('button');
    body.appendChild(button);
    button.innerHTML = 'bonk';
    button.onclick = bonkButton;
}

function bonkButton() {
    console.log('bonk!');
    //create a synth and connect it to the master output (your speakers)
    var synth = new Tone.Synth().toMaster();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
}
