const key = document.querySelector('#cle input');

const uncodedInput = document.querySelector('#original input');
const encodedInput = document.querySelector('#chiffre input');

function onClickEncode() {
    if (validate(key)) {
        encodedInput.value = encodeInput(uncodedInput.value, parseInt(key.value));
    }
}

function onClickDecode() {
    if (validate(key)) {
        uncodedInput.value = uncodeInput(encodedInput.value, parseInt(key.value));
    }
}

function validate(key) {
    if (key.value.length == 0) {
        key.style.background = '#db6969';
        return false;
    }
    else if (parseInt(key.value) < 0 || parseInt(key.value) > 26) {
        key.style.background = '#db6969';
        return false;
    }
    else {
        key.style.background = '#ffffff';
        return true;
    }
}

const minuscules = 'abcdefghijklmnopqrstuvwxyz';
const majuscules = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeInput(uncoded, key) {
    var encoded = '';
    for (let i = 0; i < uncoded.length; i++) {
        if (find(uncoded[i], minuscules)) {
            encoded += encode(uncoded[i], minuscules, key);
        }
        else if (find(uncoded[i], majuscules)) {
            encoded += encode(uncoded[i], majuscules, key);
        }
        else {
            encoded += '_';
        }
    }
    return encoded;
}

function uncodeInput(encoded, key) {
    var uncoded = '';
    for (let i = 0; i < encoded.length; i++) {
        if (find(encoded[i], minuscules)) {
            uncoded += uncode(encoded[i], minuscules, key);
        }
        else if (find(encoded[i], majuscules)) {
            uncoded += uncode(encoded[i], majuscules, key);
        }
        else {
            uncoded += '_';
        }
    }
    return uncoded;
}

function find(character, letters) {
    for (let i = 0; i < letters.length; i++) {
        if (character == letters[i]) {
            return true;
        }
    }
    return false;
}

function encode(character, letters, key) {
    var index = 0;
    for (let i = 0; i < letters.length; i++) {
        if (character == letters[i]) {
            index = i;
        }
    }
    var newIndex = 0;
    if (index + key >= letters.length) {
        newIndex = index + key - letters.length;
    }
    else {
        newIndex = index + key;
    }
    return letters[newIndex];
}

function uncode(character, letters, key) {
    var index = 0;
    for (let i = 0; i < letters.length; i++) {
        if (character == letters[i]) {
            index = i;
        }
    }
    var newIndex = 0;
    if (index - key <= -1) {
        newIndex = index - key + letters.length;
    }
    else {
        newIndex = index - key;
    }
    return letters[newIndex];
}