import AuthLayout from "@/app/components/AuthPage/AuthLayout";
import UserContent from "@/app/components/AuthPage/UserContent/UserContent/UserContent";
import NewPassFields from "@/app/components/AuthPage/UserContent/NewPassword/NewPasswordFields";
export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <NewPassFields />
      </UserContent>
    </AuthLayout>
  );
}
