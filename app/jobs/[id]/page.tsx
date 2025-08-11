"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useParams } from "next/navigation";
import { Job } from "@/interfaces";
import LinkAsButton from "@/components/common/LinkAsButton";

// Dummy data for testing when API is not responding
const dummyJobData: { [key: string]: Job } = {
  "1": {
    _id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    description:
      "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using modern JavaScript frameworks and ensuring optimal user experience. The ideal candidate will have strong expertise in React, TypeScript, and modern CSS frameworks.",
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and JavaScript",
      "Experience with modern CSS frameworks (Tailwind CSS, Styled Components)",
      "Knowledge of state management libraries (Redux, Zustand)",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Understanding of responsive design and cross-browser compatibility",
      "Experience with build tools (Webpack, Vite)",
      "Knowledge of Git and version control",
    ],
    responsibilities: [
      "Develop and maintain user-facing features",
      "Write clean, maintainable, and efficient code",
      "Collaborate with designers and backend developers",
      "Optimize applications for maximum speed and scalability",
      "Ensure code quality through code reviews and testing",
      "Mentor junior developers and share knowledge",
      "Stay up-to-date with emerging technologies and best practices",
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work hours and remote work options",
      "Professional development and conference attendance",
      "401(k) matching and stock options",
      "Unlimited vacation and sick days",
      "Modern equipment and home office setup",
    ],
    jobType: "Full-time",
    category: "Technology",
    region: "San Francisco",
    country: "USA",
    salary: 120000,
    experience: "5+ years",
    education: "Bachelor's degree in Computer Science or related field",
    createdAt: "2024-01-15T10:00:00Z",
    companyDescription:
      "TechCorp Solutions is a leading technology company specializing in innovative software solutions for businesses worldwide. We focus on creating cutting-edge applications that solve real-world problems.",
    companySize: "100-500 employees",
    companyWebsite: "https://techcorp-solutions.com",
    companyEmail: "careers@techcorp-solutions.com",
    companyPhone: "+1 (555) 123-4567",
  },
  "2": {
    _id: "2",
    title: "UX/UI Designer",
    company: "Creative Studios Inc",
    description:
      "Join our creative team as a UX/UI Designer where you'll create beautiful, intuitive, and user-centered digital experiences. You'll work closely with product managers, developers, and stakeholders to design solutions that delight users and drive business goals.",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Strong understanding of user-centered design principles",
      "Experience with design systems and component libraries",
      "Knowledge of accessibility standards and best practices",
      "Experience with user research and usability testing",
      "Portfolio showcasing web and mobile app designs",
    ],
    responsibilities: [
      "Create user-centered designs by understanding business requirements",
      "Create user flows, wireframes, prototypes and mockups",
      "Translate requirements into style guides, design systems, design patterns and attractive user interfaces",
      "Create original graphic designs (e.g. images, sketches and tables)",
      "Identify and troubleshoot UX problems (e.g. responsiveness)",
      "Collaborate with product managers and developers to implement designs",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health, dental, and vision insurance",
      "Flexible work schedule and remote options",
      "Professional development budget",
      "Creative and collaborative work environment",
      "Regular team events and activities",
    ],
    jobType: "Full-time",
    category: "Design",
    region: "New York",
    country: "USA",
    salary: 95000,
    experience: "3+ years",
    education: "Bachelor's degree in Design, HCI, or related field",
    createdAt: "2024-01-20T14:30:00Z",
    companyDescription:
      "Creative Studios Inc is a boutique design agency that specializes in creating memorable digital experiences. We work with startups and established companies to bring their visions to life.",
    companySize: "10-50 employees",
    companyWebsite: "https://creativestudios.com",
    companyEmail: "jobs@creativestudios.com",
    companyPhone: "+1 (555) 234-5678",
  },
  "3": {
    _id: "3",
    title: "Product Manager",
    company: "InnovateTech",
    description:
      "We're seeking a Product Manager to drive product strategy and execution for our SaaS platform. You'll work closely with engineering, design, and business teams to deliver products that solve customer problems and drive business growth.",
    requirements: [
      "4+ years of product management experience",
      "Experience with SaaS products and B2B software",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Excellent communication and stakeholder management skills",
      "Data-driven decision making approach",
      "Experience with product analytics tools",
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering teams to deliver features on time",
      "Analyze product metrics and user feedback",
      "Collaborate with marketing and sales teams",
      "Conduct market research and competitive analysis",
      "Define and track key product metrics",
    ],
    benefits: [
      "Competitive salary with equity options",
      "Comprehensive benefits package",
      "Flexible work environment",
      "Professional development opportunities",
      "Regular team offsites and events",
      "Modern office with great amenities",
    ],
    jobType: "Full-time",
    category: "Product",
    region: "Austin",
    country: "USA",
    salary: 110000,
    experience: "4+ years",
    education: "Bachelor's degree in Business, Engineering, or related field",
    createdAt: "2024-01-25T09:15:00Z",
    companyDescription:
      "InnovateTech is a fast-growing SaaS company that helps businesses streamline their operations through innovative software solutions. We're passionate about building products that make work easier and more efficient.",
    companySize: "50-200 employees",
    companyWebsite: "https://innovatetech.com",
    companyEmail: "careers@innovatetech.com",
    companyPhone: "+1 (555) 345-6789",
  },
};

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${params.id}`
        );
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job from API:", err);

        // Fallback to dummy data if API fails
        const dummyJob = dummyJobData[params.id as string];
        if (dummyJob) {
          console.log("Using dummy data for job ID:", params.id);
          setJob(dummyJob);
        } else {
          setError("Job not found in API or dummy data");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Job Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The job you're looking for doesn't exist."}
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                <LinkAsButton
                  href={`/jobs/${job._id}/apply`}
                  text=" Apply Now"
                />
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
                      {(job.requirements || []).map((req, index) => (
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
                      {(job.responsibilities || []).map((resp, index) => (
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
                      {(job.benefits || []).map((benefit, index) => (
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
