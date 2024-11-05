"use client"

import AuthLayout from "@/app/components/AuthPage/AuthLayout";
import ResetPassword from "@/app/components/AuthPage/ResetPassword/ResetPassword";
export default function NewPassword() {
  return (
    <AuthLayout>
      <ResetPassword></ResetPassword>
    </AuthLayout>
  );
}
