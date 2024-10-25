import AuthLayout from "../components/AuthPage/AuthLayout";
import UserContent from "../components/AuthPage/UserContent/UserContent/UserContent";
import LoginFields from "../components/AuthPage/UserContent/LoginFields/LoginFields";

export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <LoginFields></LoginFields>
      </UserContent>
    </AuthLayout>
  );
}
