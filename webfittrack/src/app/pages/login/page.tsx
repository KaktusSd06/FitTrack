import AuthLayout from "@/app/components/AuthPage/AuthLayout";
import UserContent from "@/app/components/AuthPage/UserContent/UserContent/UserContent";
import LoginFields from "@/app/components/AuthPage/UserContent/LoginFields/LoginFields";
export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <LoginFields></LoginFields>
      </UserContent>
    </AuthLayout>
  );
}
