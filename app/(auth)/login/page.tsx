"use client";

import { Suspense } from "react";
import Login from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
