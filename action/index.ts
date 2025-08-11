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


export async function isUserLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; 

  return Boolean(token);
}