import { prisma } from "../../db";

export class InstallationRepository {
    async findByClientId(clientId: number, selectInvoices: boolean) {
        const installations = await prisma.installation.findMany({
            where: {
                clientId: clientId
            },
            select: {
                installationCode: true,
                invoices: selectInvoices
            }
        });

        return installations;
    }
}