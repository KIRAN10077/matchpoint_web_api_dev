import ForgotPasswordForm from "../_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Reset your password</h1>
      <p className="text-sm text-white/70">Enter your email to receive a password reset link</p>
      <div className="pt-4">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
