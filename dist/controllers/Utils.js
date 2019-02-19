"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    // send a random number to be used
    static getRandom(min, max) {
        return Math.trunc(Math.random() * (max - min) + min);
    }
}
exports.Util = Util;
//# sourceMappingURL=Utils.js.map