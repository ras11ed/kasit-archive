
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not configured");
    }

    const sql = neon(databaseUrl);
    const result = await sql`SELECT NOW() AS server_time`;

    return NextResponse.json({
      message: "Database connection successful.",
      connected: true,
      serverTime: result[0].server_time,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return NextResponse.json(
      {
        message: "Database connection failed.",
        connected: false,
      },
      { status: 500 }
    );
  }
}
