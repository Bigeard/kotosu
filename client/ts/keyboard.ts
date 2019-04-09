
const arrowCodes = new Map([
    [37, 'left'],
    [38, 'up'],
    [39, 'right'],
    [40, 'down'],
    [87, 'shoot'],
    [88, 'dash'],
    [9, 'info']
]);

const trackKeys = (codes: Map<number, string>) => {
    let pressed = new Map();
    codes.forEach((code) => { pressed.set(code, false); });
    const handler = (event: { keyCode: number; type: string; preventDefault: () => void; }) => {
        if (codes.get(event.keyCode) !== undefined) {
            let down = event.type === 'keydown';
            pressed.set(codes.get(event.keyCode), down);
            event.preventDefault();
        }
    };
    addEventListener('keydown', handler);
    addEventListener('keyup', handler);
    return pressed;
};

export var arrows = trackKeys(arrowCodes);

window.onfocus = () => {
    arrows = trackKeys(arrowCodes);
};

window.onblur = () => {
    arrowCodes.forEach((code) => { arrows.set(code, false); });
};
