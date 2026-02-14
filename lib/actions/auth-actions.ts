"use server";

import { loginUser, registerUser } from "@/lib/api/auth";
import { cookies } from "next/headers";

export const handleRegister = async (formData: { name: string; email: string; password: string; confirmPassword: string }) => {
  try {
    const res = await registerUser(formData);
    return {
      success: true,
      message: res.message,
      data: res.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    const res = await loginUser(formData);

    const cookieStore = await cookies();

    cookieStore.set("token", res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("user", JSON.stringify(res.data), {
      httpOnly: false,
      path: "/",
    });

    cookieStore.set("role", res.data.role, {
      httpOnly: false,
      path: "/",
    });

    return {
      success: true,
      message: res.message,
      data: res.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const handleUpdateProfile = async (formData: { name: string; email: string }) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const token = (await cookies()).get("token")?.value;
    const userCookie = (await cookies()).get("user")?.value;

    if (!token || !userCookie) {
      return {
        success: false,
        message: "Unauthorized - No token found",
      };
    }

    const user = JSON.parse(userCookie);

    const res = await fetch(`${baseUrl}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update profile");
    }

    // Update the user cookie with new data
    (await cookies()).set("user", JSON.stringify(data.data), {
      httpOnly: false,
      path: "/",
    });

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const token = (await cookies()).get("token")?.value;
    
    if (!token) {
      return {
        success: false,
        message: "Unauthorized - No token found",
      };
    }
    
    const res = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete user");
    }
    
    return {
      success: true,
      message: data.message,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const handleForgotPassword = async (email: string) => {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to send reset email");
    }

    return {
      success: true,
      message: data.message,
      token: data.token, // Include token if backend returns it
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};

export const handleResetPassword = async (token: string, newPassword: string, confirmPassword: string) => {
  try {
    if (newPassword !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to reset password");
    }

    return {
      success: true,
      message: data.message,
    };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
};
