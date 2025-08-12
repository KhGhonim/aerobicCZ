import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { MAX_PAYLOAD_SIZE, MAX_FILE_SIZE, MAX_IMAGES } from "@/Utils/constants";

export default withAuth(
  function middleware(req: NextRequest) {
    // Check content length for POST/PUT requests
    const contentLength = req.headers.get('content-length');
    
    if (req.method === 'POST' || req.method === 'PUT') {
      if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
        return NextResponse.json(
          { 
            error: `Upload too large. Maximum total upload is ${Math.floor(MAX_PAYLOAD_SIZE / (1024 * 1024))}MB per request.`,
            details: `You can upload up to ${MAX_IMAGES} images at once, each up to ${Math.floor(MAX_FILE_SIZE / (1024 * 1024))}MB.`,
          },
          { status: 413 }
        );
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow access if user has admin role
        return token?.role === "admin";
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/dashboard", 
    "/admin/dashboard/news", 
    "/admin/dashboard/gallery",
    "/admin/dashboard/contact",
    "/api/admin/:path*"
  ],
}; 