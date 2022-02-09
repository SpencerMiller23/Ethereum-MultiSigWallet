import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { walletName, walletAddress, walletOwners } = req.body;

    try {
      const result = await prisma.wallet.create({
        data: {
          name: walletName,
          address: walletAddress,
          owners: walletOwners,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
