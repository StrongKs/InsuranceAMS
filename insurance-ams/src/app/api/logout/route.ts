// /pages/api/logout.ts

import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
