"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/common/JobCard";
import Title from "@/components/common/Title";
import LinkAsButton from "@/components/common/LinkAsButton";
import { Skeleton } from "@/components/ui/skeleton";
import { getSavedJob } from "@/action";
import { Job } from "@/interfaces";

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getSavedJob();
        if (response.success) {
          setJobs(response.jobs || []);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 space-y-4 border-l-4 border-l-primary/20">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Title
          title="Saved Jobs"
          description="Browse all jobs available here at Nexus"
        />

        {loading ? (
          <div className="grid grid-cols-1  gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No saved jobs found at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

        <div className="flex justify-center py-4">
          <LinkAsButton href="/jobs" text="Go to Jobs" />
        </div>
      </section>
    </>
  );
}
