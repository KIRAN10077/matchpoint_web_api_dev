import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-sm text-white/70">Sign in to continue</p>
      <div className="pt-4">
        <LoginForm />
      </div>
    </div>
  );
}
