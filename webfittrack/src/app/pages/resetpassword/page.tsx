import AuthLayout from "@/app/components/AuthPage/AuthLayout";
import UserContent from "@/app/components/AuthPage/UserContent/UserContent/UserContent";
import ResetPasswordFields from "@/app/components/AuthPage/UserContent/ResetPasswordFields/ResetPasswordFields";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <UserContent>
        <ResetPasswordFields></ResetPasswordFields>
      </UserContent>
    </AuthLayout>
  );
}
