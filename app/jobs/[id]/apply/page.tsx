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
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Job } from "@/interfaces";
import { apply } from "@/action";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// ✅ Validation Schema
const formSchema = z.object({
  coverLetter: z
    .string()
    .min(10, "Cover letter must be at least 10 characters"),
});

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const jobId = Array.isArray(params.id) ? params.id[0] : params.id || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { coverLetter: "" },
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}`
        );
        setJob(response.data);
      } catch (err: any) {
        console.error("Error fetching job from API:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id, jobId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await apply({
        jobId,
        coverLetter: values.coverLetter,
      });

      if (result.success) {
        toast.success("Your application has been submitted successfully!");
        form.reset();
      } else {
        toast.error(result.message || "Failed to submit application");
      }
    } catch (error: any) {
      console.error("Application submission failed:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

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
            </div>
          </CardHeader>
        </Card>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Apply for this Job</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your cover letter here..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {successMessage && (
                  <p className="text-green-600 text-sm">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Submit Application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
