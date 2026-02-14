import ResetPasswordForm from "../_components/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Create new password</h1>
      <p className="text-sm text-white/70">Enter your new password below</p>
      <div className="pt-4">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
