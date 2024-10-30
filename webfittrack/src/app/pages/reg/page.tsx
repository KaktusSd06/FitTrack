import AuthLayout from "@/app/components/AuthPage/AuthLayout";
import UserContent from "@/app/components/AuthPage/UserContent/UserContent/UserContent";
import RegFields from "@/app/components/AuthPage/UserContent/RegFields/RegFields";

export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <RegFields />
      </UserContent>
    </AuthLayout>
  );
}
