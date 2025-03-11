import { PrismaClient } from "@prisma/client";
import jobsData from "../src/lib/data.json";

const prisma = new PrismaClient();

async function main() {
  for (const job of jobsData) {
    await prisma.job.create({
      data: {
        company: job.company,
        logo: job.logo,
        logoBackground: job.logoBackground,
        position: job.position,
        postedAt: job.postedAt,
        contract: job.contract,
        location: job.location,
        website: job.website,
        apply: job.apply,
        description: job.description,
        requirements: job.requirements,
        role: job.role,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
