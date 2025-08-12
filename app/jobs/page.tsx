"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Title from "@/components/common/Title";
import JobCard from "@/components/common/JobCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Job } from "@/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [country, setCountry] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([
    12000, 50000,
  ]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`
        );
        setJobs(response.data);
      } catch {
        console.log("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const countries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.country))),
    [jobs]
  );
  const jobTypes = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.jobType))),
    [jobs]
  );
  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category))),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesCountry = country ? job.country === country : true;
      const matchesType = jobType ? job.jobType === jobType : true;
      const matchesCategory = category ? job.category === category : true;
      const matchesSalary =
        job.salary >= salaryRange[0] && job.salary <= salaryRange[1];
      return matchesCountry && matchesType && matchesCategory && matchesSalary;
    });
  }, [jobs, country, jobType, category, salaryRange]);

  const clearFilters = () => {
    setCountry("");
    setJobType("");
    setCategory("");
    setSalaryRange([12000, 50000]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
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

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 p-4 bg-white rounded-lg shadow">
          {/* Country */}
          <Select
            onValueChange={(val) => setCountry(val === "all" ? "" : val)}
            value={country || "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Job Type */}
          <Select
            onValueChange={(val) => setJobType(val === "all" ? "" : val)}
            value={jobType || "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              {jobTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category */}
          <Select
            onValueChange={(val) => setCategory(val === "all" ? "" : val)}
            value={category || "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Salary */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-medium mb-2">Salary Range</span>
            <Slider
              value={salaryRange}
              min={12000}
              max={50000}
              step={1000}
              onValueChange={(val) =>
                setSalaryRange([val[0], val[1]] as [number, number])
              }
            />
            <span className="text-xs text-gray-500 mt-1">
              ${salaryRange[0]} - ${salaryRange[1]}
            </span>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Job List or Skeleton Loader */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg bg-white">
                <Skeleton className="h-6 w-3/4 mb-3" /> {/* title */}
                <Skeleton className="h-4 w-1/2 mb-4" /> {/* company */}
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-16 w-full mb-4" /> {/* description */}
                <Skeleton className="h-10 w-full" /> {/* button */}
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center py-20 text-gray-500">No Jobs Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
