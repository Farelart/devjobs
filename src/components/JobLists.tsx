"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getJobs } from "@/actions/actions";
import { useSearchParams } from "next/navigation";

type Job = {
  id: string;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: unknown;
  role: unknown;
};

export default function JobLists({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialJobs.length >= 12);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  const loadMore = async () => {
    setLoading(true);
    try {
      const skip = page * 12;
      const params = {
        title: searchParams.get("title") || undefined,
        location: searchParams.get("location") || undefined,
        isFullTime: searchParams.get("isFullTime") === "true",
      };

      const { jobs: newJobs } = await getJobs(params, skip);

      if (newJobs.length > 0) {
        setJobs((prev) => [...prev, ...newJobs]);
        setPage((prev) => prev + 1);
        setHasMore(newJobs.length >= 12);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-4 md:mt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 p-6 max-w-xs md:max-w-3xl lg:max-w-6xl mx-auto text-xs">
        {jobs.map((job) => (
          <Link
            href={`/job/${job.id}`}
            key={job.id}
            className="bg-white rounded-md p-8 relative"
          >
            <div
              className="w-12 h-12 rounded-2xl absolute -top-6 flex items-center justify-center"
              style={{ backgroundColor: job.logoBackground }}
            >
              <Image
                src={job.logo}
                alt={`${job.company} logo`}
                width={40}
                height={40}
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-500">
                <span>{job.postedAt}</span>
                <span>•</span>
                <span>{job.contract}</span>
              </div>

              <h3 className="font-bold hover:text-[#5964E0] transition-colors">
                {job.position}
              </h3>

              <p className="text-gray-500">{job.company}</p>

              <p className="text-[#5964E0] font-bold mt-10">{job.location}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-[#5964E0] text-xs text-white px-8 py-3 rounded-md font-bold mt-10 mb-6 hover:bg-opacity-90 disabled:bg-opacity-70"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
