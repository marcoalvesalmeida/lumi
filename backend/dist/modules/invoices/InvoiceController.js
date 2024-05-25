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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceController = void 0;
const zod_1 = require("zod");
const path_1 = __importDefault(require("path"));
const InvoiceService_1 = require("./InvoiceService");
const InstallationRepository_1 = require("../installation/InstallationRepository");
const inputSchema = zod_1.z.object({
    client: zod_1.z.string().refine(val => !isNaN(Number(val)), {
        message: 'client must be a number',
    }).transform(val => Number(val)),
});
class InvoiceController {
    handleFindInvoiceByClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const installationRepository = new InstallationRepository_1.InstallationRepository();
                const { client } = inputSchema.parse(request.params);
                const installations = yield installationRepository.findByClientId(client, true);
                return response.status(200).json({
                    success: true,
                    data: installations.flatMap(installation => installation.invoices),
                });
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return response.status(400).json({
                        success: false,
                        error: 'Bad request, clientID is required and must be a number.',
                        strack: error
                    });
                }
                return response.status(500).json({
                    success: false,
                    error: 'There was an internal server problem, please try again!',
                });
            }
        });
    }
    handleFindInvoicePathByClient(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const installationRepository = new InstallationRepository_1.InstallationRepository();
                const { client } = inputSchema.parse(request.params);
                const installations = yield installationRepository.findByClientId(client, false);
                const invoiceService = new InvoiceService_1.InvoiceService();
                const paths = [];
                for (const installation of installations) {
                    const invoicesDir = path_1.default.join(process.cwd(), 'src', 'modules', 'extractor', 'invoices', installation.installationCode);
                    const list = invoiceService.listInvoiceFiles(invoicesDir);
                    if (list.length > 0) {
                        paths.push({ installation: installation.installationCode, files: list });
                    }
                }
                return response.status(200).json({
                    success: true,
                    baseURL: 'http://' + request.headers.host + '/files',
                    data: paths,
                });
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    return response.status(400).json({
                        success: false,
                        error: 'Bad request, clientID is required and must be a number.',
                        strack: error
                    });
                }
                return response.status(500).json({
                    success: false,
                    error: 'There was an internal server problem, please try again!'
                });
            }
        });
    }
}
exports.invoiceController = new InvoiceController();
//# sourceMappingURL=InvoiceController.js.map