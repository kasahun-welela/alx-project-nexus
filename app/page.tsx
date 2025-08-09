import Hero from "@/components/Hero";
import JobCard from "@/components/common/JobCard";
import Title from "@/components/common/Title";
import { dummyJobs } from "@/dummayData";
import LinkAsButton from "@/components/common/LinkAsButton";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Title
          title="All Jobs"
          description="Browse all jobs available here at Nexus"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyJobs.slice(0, 3).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="flex justify-center py-4">
          <LinkAsButton href="/jobs">View All Jobs</LinkAsButton>
        </div>
      </section>
    </>
  );
}
