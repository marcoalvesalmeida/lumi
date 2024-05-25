"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const fs_1 = __importDefault(require("fs"));
class InvoiceService {
    constructor() {
        this.listInvoiceFiles = (directory) => {
            try {
                const files = fs_1.default.readdirSync(directory);
                return files;
            }
            catch (error) {
                return [];
            }
        };
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=InvoiceService.js.map