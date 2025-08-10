"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Title from "@/components/common/Title";
import JobCard from "@/components/common/JobCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Job } from "@/interfaces";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`
        );
        setJobs(response.data);
      } catch (err: any) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
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
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Error Loading Jobs
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {jobs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No Jobs Found
              </h2>
              <p className="text-gray-600">
                There are currently no jobs available.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
