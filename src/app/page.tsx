import SearchForm from "@/components/SearchForm";
import JobLists from "@/components/JobLists";
import { getLocations, getJobs } from "@/actions/actions";

type HomeProps = {
  searchParams: { title?: string; location?: string; isFullTime?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const locations = await getLocations();
  const { jobs } = await getJobs({
    title: params.title,
    location: params.location,
    isFullTime: params.isFullTime === "true",
  });

  return (
    <main>
      <SearchForm locations={locations} />
      <JobLists initialJobs={jobs} />
    </main>
  );
}
