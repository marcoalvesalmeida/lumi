import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";
import { prisma } from "../../db/index.ts";

async function getPdfPaths(dir: string): Promise<string[]> {
    const pdfPaths: string[] = [];
    async function findPdfs(currentDir: string) {
        const entries = await fs.readdirSync(currentDir);
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry);
            const stat = await fs.lstatSync(fullPath);
            if (stat.isDirectory()) {
                await findPdfs(fullPath);
            } else {
                pdfPaths.push(fullPath);
            }
        }
    }
    await findPdfs(dir);
    return pdfPaths;
}

function extractData(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const textGroup: string[] = [];
        fs.readFile(filePath, (fileError, pdfBuffer) => {
            if (fileError) {
                reject(fileError);
            }
            if (!fileError) {
                new PdfReader({}).parseBuffer(pdfBuffer, (readerErr, item) => {
                    if (readerErr) {
                        reject(readerErr);
                    } else if (!item) resolve(textGroup);
                    else if (item.text) {
                        textGroup.push(item.text);
                    }
                });
            }
        });
    });
}

async function main() {
    try {
        const invoicesDir = path.join(
            process.cwd(),
            "src",
            "modules",
            "extractor",
            "invoices",
        );
        const invoicesPaths = await getPdfPaths(invoicesDir);

        for (const invoicePath of invoicesPaths) {
            const data = await extractData(invoicePath);

            const clientIDPosition = data.findIndex((element) =>
                element.includes("Nº DO CLIENTE"),
            );
            const clientID = data[clientIDPosition + 1];

            const monthRefPosition = data.findIndex((element) =>
                element.includes("Referente a"),
            );
            const monthRef = data[monthRefPosition + 2];

            const electricityPosition = data.findIndex((element) =>
                element.includes("Energia Elétrica"),
            );
            const electricityKwh = data[electricityPosition + 2];
            const electricityPrice = data[electricityPosition + 4];

            const electricitySCEEPosition = data.findIndex((element) =>
                element.includes("Energia SCEE") || element.includes("En comp. s/ ICMS"),
            );
            const electricitySCEEKwh =
                electricitySCEEPosition !== -1
                    ? data[electricitySCEEPosition + 2]
                    : "0";
            const electricitySCEEPrice =
                electricitySCEEPosition !== -1
                    ? data[electricitySCEEPosition + 4]
                    : "0";

            const electricityGDPosition = data.findIndex((element) =>
                element.includes("Energia compensada GD I") || element.includes("Energia injetada HFP"),
            );
            const electricityGDKwh =
                electricityGDPosition !== -1
                    ? data[electricityGDPosition + 2]
                    : "0";
            const electricityGDPrice =
                electricityGDPosition !== -1
                    ? data[electricityGDPosition + 4]
                    : "0";

            const publicContributionPosition = data.findIndex((element) =>
                element.includes("Contrib Ilum Publica Municipal"),
            );
            const publicContribution =
                publicContributionPosition !== -1
                    ? data[publicContributionPosition + 1]
                    : "0";

            const clientIdFormmated = clientID.trim().split(" ")[0];
            const installationIdFormmated = clientID
                .trim()
                .split(" ")
                .reverse()[0];

            let clientIdDB;

            const client = await prisma.client.findUnique({
                where: {
                    clientCode: clientIdFormmated
                }
            });

            if(client){
                clientIdDB = client.id
            }else{
                const {id} = await prisma.client.create({
                    data: {
                      clientCode: clientIdFormmated
                    },
                });
                clientIdDB = id;
            }

            let installationIdDB;

            const installation = await prisma.installation.findFirst({
                where: {
                    installationCode: installationIdFormmated
                }
            });

            if(installation){
                installationIdDB = installation.id
            }else{
                const {id} = await prisma.installation.create({
                    data: {
                      installationCode: installationIdFormmated,
                      clientId: clientIdDB,
                    },
                });
                installationIdDB = id;
            }

            await prisma.invoice.create({
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
    } catch (error) {
        console.error(error);
    }
}

main();
