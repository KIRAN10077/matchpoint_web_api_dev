"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, registerSchema } from "../schema";
import { handleRegister } from "@/lib/actions/auth-actions";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();

  const submit = async (values: RegisterData) => {
    startTransition(async () => {
      const res = await handleRegister(values);
      if (res.success) {
        router.push("/login");
      } else {
        alert(res.message);
      }
    });
  };

  const disabled = isSubmitting || pending;

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90" htmlFor="name">
          Full name
        </label>

        <input
          id="name"
          placeholder="Your name"
          className={[
            "h-11 w-full rounded-lg border px-3 text-sm outline-none transition",
            "bg-white/10 text-white placeholder:text-white/50",
            "focus:bg-white/15",
            errors.name
              ? "border-red-500/70 focus:border-red-500"
              : "border-white/15 focus:border-white/35",
          ].join(" ")}
          {...register("name")}
        />

        {errors.name?.message && (
          <p className="text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90" htmlFor="email">
          Email address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={[
            "h-11 w-full rounded-lg border px-3 text-sm outline-none transition",
            "bg-white/10 text-white placeholder:text-white/50",
            "focus:bg-white/15",
            errors.email
              ? "border-red-500/70 focus:border-red-500"
              : "border-white/15 focus:border-white/35",
          ].join(" ")}
          {...register("email")}
        />

        {errors.email?.message && (
          <p className="text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/90" htmlFor="password">
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={[
              "h-11 w-full rounded-lg border px-3 pr-12 text-sm outline-none transition",
              "bg-white/10 text-white placeholder:text-white/50",
              "focus:bg-white/15",
              errors.password
                ? "border-red-500/70 focus:border-red-500"
                : "border-white/15 focus:border-white/35",
            ].join(" ")}
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password?.message && (
          <p className="text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-white/90"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            className={[
              "h-11 w-full rounded-lg border px-3 pr-12 text-sm outline-none transition",
              "bg-white/10 text-white placeholder:text-white/50",
              "focus:bg-white/15",
              errors.confirmPassword
                ? "border-red-500/70 focus:border-red-500"
                : "border-white/15 focus:border-white/35",
            ].join(" ")}
            {...register("confirmPassword")}
          />

          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white"
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>

        {errors.confirmPassword?.message && (
          <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={disabled}
        className={[
          "h-11 w-full rounded-lg text-sm font-semibold transition",
          "bg-white text-black hover:opacity-90",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        ].join(" ")}
      >
        {disabled ? "Creating account..." : "Create account"}
      </button>

      <div className="pt-1 text-center text-sm text-white/70">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-white hover:underline">
          Log in
        </Link>
      </div>
    </form>
  );
}
