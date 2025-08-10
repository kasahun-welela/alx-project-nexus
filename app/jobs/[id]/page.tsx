import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Building,
  DollarSign,
  Users,
  Globe,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Job } from "@/interfaces";
import { dummyJobs } from "@/dummayData";

const getJobById = (id: string): Job | null => {
  return dummyJobs.find((job) => job._id === id) || null;
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: PageProps) {
  const job = getJobById(params.id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Job Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist.
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase() || "") {
      case "full-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "part-time":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "contract":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "remote":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        {/* Job Header */}
        <Card className="mb-8">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getTypeColor(job.jobType)}>
                    {job.jobType}
                  </Badge>
                  <Badge variant="outline">{job.category}</Badge>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  {job.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Building className="w-5 h-5" />
                  <span className="font-medium text-lg">{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {job.region}, {job.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">
                    ${job.salary.toLocaleString()}/year
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Posted {formatDate(job.createdAt)}</span>
                </div>
              </div>
              <div className="lg:text-right">
                <Button size="lg" className="w-full lg:w-auto">
                  Apply Now
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {job.description}
                </p>

                <div className="space-y-6">
                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="leading-relaxed">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Responsibilities
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="leading-relaxed">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="leading-relaxed">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {job.company}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {job.companyDescription}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{job.companySize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${job.companyEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.companyEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${job.companyPhone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.companyPhone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience Level</span>
                  <span className="font-medium">{job.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Education</span>
                  <span className="font-medium">{job.education}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Job Type</span>
                  <Badge className={getTypeColor(job.jobType)}>
                    {job.jobType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{job.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            <Card>
              <CardContent className="pt-6">
                <Button size="lg" className="w-full mb-3">
                  Apply Now
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By applying, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
