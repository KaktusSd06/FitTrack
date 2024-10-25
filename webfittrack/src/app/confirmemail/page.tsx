import AuthLayout from "../components/AuthPage/AuthLayout";
import UserContent from "../components/AuthPage/UserContent/UserContent/UserContent";
import ConfirmEmailFields from "../components/AuthPage/UserContent/ConfirmEmailFields/ConfirmEmailFields";

export default function Login() {
  return (
    <AuthLayout>
      <UserContent>
        <ConfirmEmailFields />
      </UserContent>
    </AuthLayout>
  );
}
