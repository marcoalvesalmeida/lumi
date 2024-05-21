 
import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";

async function getPdfPaths(dir: string): Promise<string[]> {
    const pdfPaths: string[] = [];
    async function findPdfs(currentDir: string) {
        const entries = await fs.readdirSync(currentDir);
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry);
            const stat = await fs.lstatSync(fullPath)
            if (stat.isDirectory()) {
                await findPdfs(fullPath);
            }else{
                pdfPaths.push(fullPath);
            }
        }
    }
    await findPdfs(dir);
    return pdfPaths;
}

function extractData(filePath: string): Promise<string[]>{
    return new Promise((resolve, reject) => {
        const textGroup: string[] = [];
        fs.readFile(filePath, (fileError, pdfBuffer) => {
            if(fileError){
                reject(fileError);
            }
            if(!fileError){
                new PdfReader({}).parseBuffer(pdfBuffer, (readerErr, item) => {
                    if (readerErr) {
                        reject(readerErr);
                    }
                    else if (!item) resolve(textGroup);
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
        const invoicesDir = path.join(process.cwd(), 'src', 'modules', 'extractor', 'invoices');
        const invoicesPaths = await getPdfPaths(invoicesDir);

        invoicesPaths.forEach(async invoicePath => {
            const data = await extractData(invoicePath);
            
            const clientIDPosition = data.findIndex(element => element.includes("Nº DO CLIENTE"));
            const clientID = data[clientIDPosition + 1];

            const monthRefPosition = data.findIndex(element => element.includes("Referente a"));
            const monthRef = data[monthRefPosition + 2];

            const electricityPosition = data.findIndex(element => element.includes("Energia Elétrica"));
            const electricityKwh = data[electricityPosition + 2];
            const electricityPrice = data[electricityPosition + 4];

            const electricitySCEEPosition = data.findIndex(element => element.includes("Energia SCEE"));
            const electricitySCEEKwh = electricitySCEEPosition !== -1 ? data[electricitySCEEPosition + 2] : '0';
            const electricitySCEEPrice = electricitySCEEPosition !== -1 ? data[electricitySCEEPosition + 4] : '0';

            const electricityGDPosition = data.findIndex(element => element.includes("Energia compensada GD I"));
            const electricityGDKwh = electricityGDPosition !== -1 ? data[electricityGDPosition + 2] : '0';
            const electricityGDPrice = electricityGDPosition !== -1 ? data[electricityGDPosition + 4] : '0';

            const publicContributionPosition = data.findIndex(element => element.includes("Contrib Ilum Publica Municipal"));
            const publicContribution = publicContributionPosition !== -1 ? data[publicContributionPosition + 1] : '0';

            console.log("Número do Cliente: ", clientID.trim().split(' ')[0]);
            console.log("Mês de Referência: ", monthRef.trim().split(' ')[0]);
            console.log("QTDE KWh: ", electricityKwh.trim());
            console.log("Valor: ", electricityPrice.trim());
            console.log("SCEE KWh: ", electricitySCEEKwh);
            console.log("SCEE Valor: ", electricitySCEEPrice.trim());
            console.log("GD KWh: ", electricityGDKwh);
            console.log("GD Valor: ", electricityGDPrice.trim());
            console.log("Contribuição de Ilum Pública: ", publicContribution.trim());
        });
    } catch (error) {
        console.error("Error extracting data:", error);
    }
}

main();