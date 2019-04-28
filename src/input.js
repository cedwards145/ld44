const keyStates = {};

const Keys = {
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
    "E": 69,
    "Space": 32
}

function getKeyDown(keyCode) {
    return keyCode in keyStates && keyStates[keyCode];
}

function handleKeyDown(event) {
    keyStates[event.keyCode] = true;
}

function handleKeyUp(event) {
    keyStates[event.keyCode] = false;
}

export { getKeyDown, handleKeyDown, handleKeyUp, Keys };