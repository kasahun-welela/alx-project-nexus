import Title from "@/components/common/Title";
import { dummyJobs } from "@/dummayData";
import JobCard from "@/components/common/JobCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Title
          title="All Jobs"
          description="Browse all jobs available here at Nexus Jobs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {dummyJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
