"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class CryptoService {
    async genSalt() {
        const salt = await bcrypt_1.default.genSalt(10);
        return salt;
    }
    async genHash(password) {
        const salt = await this.genSalt();
        const hash = await bcrypt_1.default.hash(password, salt);
        return {
            salt,
            hash
        };
    }
}
exports.cryptoService = new CryptoService();
//# sourceMappingURL=crypto.service.js.map