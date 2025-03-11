"use server";

import { prisma } from "@/lib/db";
/* import { revalidatePath } from "next/cache"; */

export async function getLocations() {
  const locations = await prisma.job.findMany({
    select: {
      location: true,
    },
    distinct: ["location"],
  });
  return locations.map((loc) => ({
    value: loc.location.toLowerCase(),
    label: loc.location,
  }));
}

export async function getJobs(
  searchParams: {
    title?: string;
    location?: string;
    isFullTime?: boolean;
  },
  skip = 0
) {
  try {
    const limit = 12;
    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          searchParams.title
            ? {
                OR: [
                  {
                    position: {
                      contains: searchParams.title,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      contains: searchParams.title,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},
          searchParams.location
            ? {
                location: {
                  equals: searchParams.location,
                  mode: "insensitive",
                },
              }
            : {},
          searchParams.isFullTime
            ? {
                contract: { equals: "Full Time" },
              }
            : {},
        ],
      },
      take: limit,
      skip: skip,
    });
    return { jobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [] };
  }
}

export async function getJobById(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        id: id,
      },
    });

    // Parse JSON fields if they're stored as strings
    if (job) {
      if (typeof job.requirements === "string") {
        job.requirements = JSON.parse(job.requirements);
      }
      if (typeof job.role === "string") {
        job.role = JSON.parse(job.role);
      }
    }

    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}
