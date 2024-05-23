import { prisma } from "../../db";

export class InstallationRepository {
    async findByClientId(clientId: number){
        const installations = await prisma.installation.findMany({
            where: {
                clientId: clientId
            },
            select: {
                invoices: true
            }
        });

        return installations;
    }
}