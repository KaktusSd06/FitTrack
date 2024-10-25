import AuthLayout from "../components/AuthPage/AuthLayout";
import UserContent from "../components/AuthPage/UserContent/UserContent/UserContent";
import RegFields from "../components/AuthPage/UserContent/RegFields/RegFields";

export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <RegFields />
      </UserContent>
    </AuthLayout>
  );
}
