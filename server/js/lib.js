"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
exports.getRandom = getRandom;
const getTime = (time) => {
    return (Date.now() - time);
};
exports.getTime = getTime;
//# sourceMappingURL=lib.js.map