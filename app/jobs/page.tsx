import Title from "@/components/common/Title";
import { dummyJobs } from "@/dummayData";
import JobCard from "@/components/common/JobCard";

export default function page() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Title title="All Jobs" description="Browse all jobs available here" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
