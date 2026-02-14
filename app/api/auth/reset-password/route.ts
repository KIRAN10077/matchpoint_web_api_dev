import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token and new password are required" },
        { status: 400 }
      );
    }

    // Get the backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      // Forward the request to your backend API
      const response = await fetch(`${backendUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
      }

      return NextResponse.json(data, { status: 200 });
    } catch (fetchError) {
      console.error("Backend fetch error:", fetchError);
      return NextResponse.json(
        { 
          success: false, 
          message: "Unable to connect to backend API. Make sure NEXT_PUBLIC_API_URL is configured correctly.",
          details: fetchError instanceof Error ? fetchError.message : "Unknown error"
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
