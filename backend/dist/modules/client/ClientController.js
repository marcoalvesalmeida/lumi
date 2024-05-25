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
exports.clientController = void 0;
const ClientRepository_1 = require("./ClientRepository");
class ClientController {
    handleListAllClients(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientRepository = new ClientRepository_1.ClientRepository();
                const clients = yield clientRepository.findAll();
                return response.status(200).json({
                    success: true,
                    data: clients
                });
            }
            catch (error) {
                return response.status(500).json({
                    success: false,
                    error: 'There was an internal server problem, please try again!',
                });
            }
        });
    }
}
exports.clientController = new ClientController();
//# sourceMappingURL=ClientController.js.map