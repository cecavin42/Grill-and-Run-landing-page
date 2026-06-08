import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS email_signups (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await ensureTable();

    await sql`INSERT INTO email_signups (email) VALUES (${email})`;

    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM email_signups`;

    return NextResponse.json({ success: true, count });
  } catch (err: unknown) {
    const isDuplicate =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "23505";

    if (isDuplicate) {
      const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM email_signups`;
      return NextResponse.json(
        { error: "This email is already registered.", count },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
