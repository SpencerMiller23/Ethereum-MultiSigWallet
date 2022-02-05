import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, address, owners } = req.body;

  const result = await prisma.wallet.create({
    data: {
      name: name,
      address: address,
      owners: owners,
    },
  });
  res.json(result);
}
