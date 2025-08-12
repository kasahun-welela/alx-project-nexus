"use server";

import { cookies } from "next/headers";
import axios from "axios";
import axiosInstance from "@/lib/axiosConfig";


export interface LoginFormData {
  email: string;
  password: string;
}
export interface Applications {
  jobId: string;
  coverLetter: string;
}

export async function login(formData: LoginFormData) {
  try {
    // Call the login API endpoint
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = response.data;
    if (result?.user?.token) {
     
      const cookieStore = await cookies();
      cookieStore.set("token", result.user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return {
        success: true,
        message: "Login successful",
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        },
      };
    }

    return {
      success: false,
      message: "Invalid response from server",
    };
  } catch (error: any) {
    console.error("Login error:", error);

    // Handle API error messages
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.msg || "Invalid credentials",
      };
    }

    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
}




export async function isUserLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; 

  return Boolean(token);
}

export async function apply(formData: Applications) {
  try {
   
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications`,
      formData,
     
    );

    const result = response.data;

    if (result && result._id) {
      return {
        success: true,
        message: "Application submitted successfully",
        application: {
          id: result._id,
          user: result.user,
          job: result.job,
          coverLetter: result.coverLetter,
          status: result.status,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      };
    }

    return {
      success: false,
      message: "Invalid response from server",
    };
  } catch (error: any) {
    console.error("Application error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message ||
          error.response.data?.msg ||
          "Failed to submit application",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}


export async function saveJob(formData :{jobId: string}) {
  try {
   
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/save-job`,
      formData,
     
    );

    const result = response.data;

    if (result && result._id) {
      return {
        success: true,
        message: "Job Saved successfully",
       
      };
    }

    return {
      success: false,
      message: "Invalid response from server",
    };
  } catch (error: any) {
    console.error("Application error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message ||
          error.response.data?.msg ||
          "Failed to save job",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function getSavedJob() {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/saved`
    );

    const result = response.data;

    if (Array.isArray(result)) {
      if (result.length === 0) {
        return {
          success: true,
          message: "No saved jobs found",
          jobs: [],
        };
      }

      return {
        success: true,
        message: "Data fetched successfully",
        jobs: result.map((job) => ({
          _id: job._id,
          title: job.title,
          description: job.description,
          company: job.company,
          country: job.country,
          region: job.region,
          jobType: job.jobType,
          salary: job.salary,
          category: job.category,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
        })),
      };
    }

    return {
      success: false,
      message: "Invalid response from server",
    };
  } catch (error: any) {
    console.error("Fetching error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.msg || "Failed to fetch saved jobs",
      };
    }

    return {
      success: false,
      message: "An error occurred while fetching saved jobs. Please try again.",
    };
  }
}

export async function getAppliedJob() {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications`
    );

    const result = response.data;

    if (Array.isArray(result)) {
      return {
        success: true,
        message: "Data fetched successfully",
        jobs: result.map((app) => ({
          _id: app._id,
          user: app.user,
          job: {
            _id: app.job._id,
            title: app.job.title,
            description: app.job.description,
            company: app.job.company,
            country: app.job.country,
            region: app.job.region,
            jobType: app.job.jobType,
            salary: app.job.salary,
            category: app.job.category,
            createdAt: app.job.createdAt,
            updatedAt: app.job.updatedAt,
          },
          coverLetter: app.coverLetter,
          status: app.status,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
        })),
      };
    }

    return {
      success: false,
      message: "Invalid response format",
      jobs: [],
    };
  } catch (error: any) {
    console.error("Fetching error:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data?.msg || "Failed to fetch applications",
        jobs: [],
      };
    }

    return {
      success: false,
      message: "An error occurred while fetching applications",
      jobs: [],
    };
  }
}

export async function logout() {
 
    const cookieStore = await cookies();
    cookieStore.delete("token");
    
 
}