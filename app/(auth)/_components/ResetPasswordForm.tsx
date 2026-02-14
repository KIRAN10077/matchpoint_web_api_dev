"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { handleResetPassword } from "@/lib/actions/auth-actions";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid reset link. Please request a new one.");
    }
  }, [token]);

  const submit = async (values: ResetPasswordData) => {
    if (!token) {
      setErrorMessage("Invalid reset link. Please request a new one.");
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      const res = await handleResetPassword(token, values.password, values.confirmPassword);

      if (res.success) {
        alert("Password reset successfully! Redirecting to login...");
        router.push("/login");
      } else {
        setErrorMessage(res.message);
      }
    });
  };

  if (!token) {
    return (
      <div className="rounded-md bg-red-500/20 border border-red-500/50 p-4 text-sm text-red-300 text-center">
        <p>Invalid reset link. Please request a new password reset.</p>
        <Link href="/forgot-password" className="font-semibold hover:underline block mt-3">
          Request new reset link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {errorMessage && (
        <div className="rounded-md bg-red-500/20 border border-red-500/50 p-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Password */}
      <div className="space-y-2">
        <label className="text-xs font-medium" htmlFor="password">
          New Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 text-sm text-white outline-none placeholder-white/60 focus:border-white/50 focus:bg-white/20"
          {...register("password")}
          placeholder="••••••"
          disabled={isSubmitting || pending}
        />
        {errors.password?.message && (
          <p className="text-[11px] text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-xs font-medium" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="h-10 w-full rounded-md border border-white/30 bg-white/10 px-3 text-sm text-white outline-none placeholder-white/60 focus:border-white/50 focus:bg-white/20"
          {...register("confirmPassword")}
          placeholder="••••••"
          disabled={isSubmitting || pending}
        />
        {errors.confirmPassword?.message && (
          <p className="text-[11px] text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="mt-2 h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Resetting..." : "Reset Password"}
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
