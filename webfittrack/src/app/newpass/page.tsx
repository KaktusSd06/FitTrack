import AuthLayout from "../components/AuthPage/AuthLayout";
import UserContent from "../components/AuthPage/UserContent/UserContent/UserContent";
import NewPassFields from "../components/AuthPage/UserContent/NewPassword/NewPasswordFields";

export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <NewPassFields />
      </UserContent>
    </AuthLayout>
  );
}
