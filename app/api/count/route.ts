import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS email_signups (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM email_signups`;

    return NextResponse.json({ count });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
