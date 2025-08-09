import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/job.avif')]">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="py-20 md:py-0 relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Dream Job at{" "}
              <span className="text-primary">Nexus Jobs</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto">
              Connect with top companies and discover opportunities that match
              your skills and aspirations
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/jobs"
              className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
