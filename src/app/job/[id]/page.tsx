import Image from "next/image";
import Link from "next/link";
import { getJobById } from "@/actions/actions";

type JobRequirements = {
  content: string;
  items: string[];
};

type JobRole = {
  content: string;
  items: string[];
};

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
  requirements: JobRequirements;
  role: JobRole;
};

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const idParams = await params;
  const job = (await getJobById(idParams.id)) as Job | null;

  if (!job) {
    return <div className="text-center py-20">Job not found</div>;
  }

  return (
    <main className="max-w-xs md:max-w-3xl lg:max-w-6xl mx-auto px-6 pb-20">
      {/* Company header */}
      <div className="relative -top-7 bg-white rounded-md flex flex-col md:flex-row items-center md:items-stretch -mt-8 overflow-hidden">
        <div
          className="w-12 h-12 md:w-auto md:h-auto md:p-8 rounded-2xl md:rounded-none flex items-center justify-center"
          style={{ backgroundColor: job.logoBackground }}
        >
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            width={80}
            height={80}
            className="md:w-20 md:h-20"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center md:justify-between p-6 md:p-10 w-full">
          <div>
            <h1 className="text-xl font-bold">{job.company}</h1>
            <p className="text-gray-500 text-sm">
              {job.website.replace("https://", "")}
            </p>
          </div>

          <Link
            href={job.website}
            target="_blank"
            className="mt-4 md:mt-0 bg-[#F4F6F8] bg-opacity-10 text-[#5964E0] px-5 py-2 rounded-md text-sm font-medium hover:bg-opacity-20"
          >
            Company Site
          </Link>
        </div>
      </div>

      {/* Job details */}
      <div className="bg-white rounded-md p-6 md:p-10 mt-6 mb-18">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>{job.postedAt}</span>
              <span>•</span>
              <span>{job.contract}</span>
            </div>

            <h2 className="text-xl font-bold mt-2">{job.position}</h2>
            <p className="text-[#5964E0] font-bold text-sm mt-2">
              {job.location}
            </p>
          </div>

          <Link
            href={job.apply}
            target="_blank"
            className="mt-6 md:mt-0 bg-[#5964E0] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-opacity-90 text-center"
          >
            Apply Now
          </Link>
        </div>

        <div className="mt-8 text-gray-500 text-sm leading-relaxed">
          <p>{job.description}</p>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold">Requirements</h3>
          <div className="mt-4 text-gray-500 text-sm leading-relaxed">
            <p>{job.requirements.content}</p>
            <ul className="mt-6 space-y-2">
              {job.requirements.items.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-[#5964E0] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold">What You Will Do</h3>
          <div className="mt-4 text-gray-500 text-sm leading-relaxed">
            <p>{job.role.content}</p>
            <ol className="mt-6 space-y-2 list-decimal list-inside">
              {job.role.items.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-[#5964E0] font-bold">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Footer apply section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:p-6 mt-10">
        <div className="max-w-xs md:max-w-3xl lg:max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="hidden md:block">
            <h3 className="font-bold">{job.position}</h3>
            <p className="text-gray-500 text-sm">So Digital Inc.</p>
          </div>

          <Link
            href={job.apply}
            target="_blank"
            className="w-full md:w-auto bg-[#5964E0] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-opacity-90 text-center"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </main>
  );
}
