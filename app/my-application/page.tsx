"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Tag, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAppliedJob } from "@/action";
import Title from "@/components/common/Title";
import { Application } from "@/interfaces";
import LinkAsButton from "@/components/common/LinkAsButton";

export default function AppliedJobsCards() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await getAppliedJob();
        setApplications(res.jobs || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title="Applied Job"
          description="Here are list of job you applied"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col h-full p-4">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="mt-auto border-t pt-4">
                <Skeleton className="h-4 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-500">{error}</div>;
  }

  if (!applications || applications.length === 0) {
    return (
      <section className="h-screen flex flex-col items-center justify-center gap-4 container mx-auto px-6">
        <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground">
          No applications found
        </h2>
        <p className="text-lg text-muted-foreground mt-1 max-w-md">
          Looks like you haven’t applied to any jobs yet. Start browsing and
          apply to jobs that match your skills.
        </p>

        <LinkAsButton href="/jobs" text="Browse Jobs" />
      </section>
    );
  }

  // Data state
  return (
    <section className=" container mx-auto px-4 sm:px-6 lg:px-8 ">
      <Title
        title="Applied Job"
        description="Here are list of job you applied"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => {
          const { job } = app;
          return (
            <Card
              key={app._id}
              className="flex flex-col h-full border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 rounded-xl bg-card"
            >
              <CardHeader className="flex items-start justify-between gap-4 pb-3">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors duration-200">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary/80" />
                    <span className="truncate font-medium">{job.company}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className="capitalize px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {job.jobType || "—"}
                  </Badge>
                  <Badge
                    variant={
                      app.status === "submitted" ? "secondary" : "outline"
                    }
                    className="capitalize px-3 py-1 rounded-full"
                  >
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="grow px-0 pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2  px-4">
                  {job.description}
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground px-4">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  <span>{job.region ?? job.country ?? "—"}</span>
                </div>
              </CardContent>

              <CardFooter className="px-4 pt-4 border-t border-border/40 mt-auto">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary/70" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {job.category ?? "General"}
                    </span>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                    <div className="mt-1">
                      Updated: {new Date(app.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
