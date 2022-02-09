import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    if (req.method === "GET") {
        const { owner } = req.query

        try {
            const wallets = await prisma.wallet.findMany({
                where: { 
                    owners: {
                        has: owner,
                    }
                }
            })
            res.json(wallets)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}