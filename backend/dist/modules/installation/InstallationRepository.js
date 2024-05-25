"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallationRepository = void 0;
const db_1 = require("../../db");
class InstallationRepository {
    findByClientId(clientId, selectInvoices) {
        return __awaiter(this, void 0, void 0, function* () {
            const installations = yield db_1.prisma.installation.findMany({
                where: {
                    clientId: clientId
                },
                select: {
                    installationCode: true,
                    invoices: selectInvoices
                }
            });
            return installations;
        });
    }
}
exports.InstallationRepository = InstallationRepository;
//# sourceMappingURL=InstallationRepository.js.map