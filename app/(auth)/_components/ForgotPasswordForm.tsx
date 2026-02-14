"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { z } from "zod";
import { handleForgotPassword } from "@/lib/actions/auth-actions";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetLink, setResetLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (values: ForgotPasswordData) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setResetLink(null);

    startTransition(async () => {
      const res = await handleForgotPassword(values.email);

      if (res.success) {
        setSuccessMessage(res.message);
        // If backend returns a token (for development), show the reset link
        if (res.token) {
          const resetUrl = `${window.location.origin}/reset-password?token=${res.token}`;
          setResetLink(resetUrl);
        }
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {successMessage && (
        <div className="rounded-md bg-green-500/20 border border-green-500/50 p-3 text-sm text-green-300">
          {successMessage}
        </div>
      )}

      {resetLink && (
        <div className="rounded-md bg-blue-500/20 border border-blue-500/50 p-3 text-sm text-blue-300 space-y-3">
          <p className="font-medium">Reset Link Generated:</p>
          <div className="bg-black/30 p-2 rounded text-xs break-all font-mono">
            {resetLink}
          </div>
          <Link
            href={resetLink}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition"
          >
            Go to Reset Password
          </Link>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(resetLink);
              alert("Reset link copied to clipboard!");
            }}
            className="block w-full mt-2 px-3 py-1 bg-blue-500/30 hover:bg-blue-500/40 rounded text-white text-sm transition"
          >
            Copy Link
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label className="text-xs font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 text-sm text-white outline-none placeholder-white/60 focus:border-white/50 focus:bg-white/20"
          {...register("email")}
          placeholder="you@example.com"
          disabled={isSubmitting || pending || !!successMessage}
        />
        {errors.email?.message && (
          <p className="text-[11px] text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending || !!successMessage}
        className="mt-2 h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Sending..." : "Send Reset Link"}
      </button>

      <div className="text-center text-xs">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
}
