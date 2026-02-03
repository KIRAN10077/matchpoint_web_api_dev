import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="text-sm text-white/70">Get started in under a minute</p>

      <div className="pt-4">
        <RegisterForm />
      </div>
    </div>
  );
}
