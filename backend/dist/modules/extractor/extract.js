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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pdfreader_1 = require("pdfreader");
const index_ts_1 = require("../../db/index.ts");
function getPdfPaths(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfPaths = [];
        function findPdfs(currentDir) {
            return __awaiter(this, void 0, void 0, function* () {
                const entries = yield fs_1.default.readdirSync(currentDir);
                for (const entry of entries) {
                    const fullPath = path_1.default.join(currentDir, entry);
                    const stat = yield fs_1.default.lstatSync(fullPath);
                    if (stat.isDirectory()) {
                        yield findPdfs(fullPath);
                    }
                    else {
                        pdfPaths.push(fullPath);
                    }
                }
            });
        }
        yield findPdfs(dir);
        return pdfPaths;
    });
}
function extractData(filePath) {
    return new Promise((resolve, reject) => {
        const textGroup = [];
        fs_1.default.readFile(filePath, (fileError, pdfBuffer) => {
            if (fileError) {
                reject(fileError);
            }
            if (!fileError) {
                new pdfreader_1.PdfReader({}).parseBuffer(pdfBuffer, (readerErr, item) => {
                    if (readerErr) {
                        reject(readerErr);
                    }
                    else if (!item)
                        resolve(textGroup);
                    else if (item.text) {
                        textGroup.push(item.text);
                    }
                });
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invoicesDir = path_1.default.join(process.cwd(), "src", "modules", "extractor", "invoices");
            const invoicesPaths = yield getPdfPaths(invoicesDir);
            for (const invoicePath of invoicesPaths) {
                const data = yield extractData(invoicePath);
                const clientIDPosition = data.findIndex((element) => element.includes("Nº DO CLIENTE"));
                const clientID = data[clientIDPosition + 1];
                const monthRefPosition = data.findIndex((element) => element.includes("Referente a"));
                const monthRef = data[monthRefPosition + 2];
                const electricityPosition = data.findIndex((element) => element.includes("Energia Elétrica"));
                const electricityKwh = data[electricityPosition + 2];
                const electricityPrice = data[electricityPosition + 4];
                const electricitySCEEPosition = data.findIndex((element) => element.includes("Energia SCEE") || element.includes("En comp. s/ ICMS"));
                const electricitySCEEKwh = electricitySCEEPosition !== -1
                    ? data[electricitySCEEPosition + 2]
                    : "0";
                const electricitySCEEPrice = electricitySCEEPosition !== -1
                    ? data[electricitySCEEPosition + 4]
                    : "0";
                const electricityGDPosition = data.findIndex((element) => element.includes("Energia compensada GD I") || element.includes("Energia injetada HFP"));
                const electricityGDKwh = electricityGDPosition !== -1
                    ? data[electricityGDPosition + 2]
                    : "0";
                const electricityGDPrice = electricityGDPosition !== -1
                    ? data[electricityGDPosition + 4]
                    : "0";
                const publicContributionPosition = data.findIndex((element) => element.includes("Contrib Ilum Publica Municipal"));
                const publicContribution = publicContributionPosition !== -1
                    ? data[publicContributionPosition + 1]
                    : "0";
                const clientIdFormmated = clientID.trim().split(" ")[0];
                const installationIdFormmated = clientID
                    .trim()
                    .split(" ")
                    .reverse()[0];
                let clientIdDB;
                const client = yield index_ts_1.prisma.client.findUnique({
                    where: {
                        clientCode: clientIdFormmated
                    }
                });
                if (client) {
                    clientIdDB = client.id;
                }
                else {
                    const { id } = yield index_ts_1.prisma.client.create({
                        data: {
                            clientCode: clientIdFormmated
                        },
                    });
                    clientIdDB = id;
                }
                let installationIdDB;
                const installation = yield index_ts_1.prisma.installation.findFirst({
                    where: {
                        installationCode: installationIdFormmated
                    }
                });
                if (installation) {
                    installationIdDB = installation.id;
                }
                else {
                    const { id } = yield index_ts_1.prisma.installation.create({
                        data: {
                            installationCode: installationIdFormmated,
                            clientId: clientIdDB,
                        },
                    });
                    installationIdDB = id;
                }
                yield index_ts_1.prisma.invoice.create({
                    data: {
                        installationId: installationIdDB,
                        monthRef: monthRef.trim().split(' ')[0],
                        kwhCount: parseInt(electricityKwh.trim().replace(/\./g, "")),
                        price: parseFloat(electricityPrice.trim().replace(/\./g, "").replace(",", ".")),
                        sceeKwh: parseInt(electricitySCEEKwh.trim().replace(/\./g, "")),
                        sceePrice: parseFloat(electricitySCEEPrice.trim().replace(/\./g, "").replace(",", ".")),
                        gdKwh: parseInt(electricityGDKwh.trim().replace(/\./g, "")),
                        gdPrice: parseFloat(electricityGDPrice.trim().replace(/\./g, "").replace(",", ".")),
                        publicContrib: parseFloat(publicContribution.trim().replace(/\./g, "").replace(",", ".")),
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
//# sourceMappingURL=extract.js.map