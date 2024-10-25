import AuthLayout from "../components/AuthPage/AuthLayout";
import UserContent from "../components/AuthPage/UserContent/UserContent/UserContent";
import ResetPasswordFields from "../components/AuthPage/UserContent/ResetPasswordFields/ResetPasswordFields";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <UserContent>
        <ResetPasswordFields></ResetPasswordFields>
      </UserContent>
    </AuthLayout>
  );
}
