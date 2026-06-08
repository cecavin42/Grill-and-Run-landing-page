import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS high_scores (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      score INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`
      SELECT name, score
      FROM high_scores
      ORDER BY score DESC
      LIMIT 10
    `;
    return NextResponse.json({ scores: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ scores: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, score } = await req.json();

    if (
      typeof name !== "string" ||
      name.length < 1 ||
      name.length > 3 ||
      typeof score !== "number" ||
      score < 0
    ) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    await ensureTable();
    await sql`INSERT INTO high_scores (name, score) VALUES (${name.toUpperCase()}, ${score})`;

    const rows = await sql`
      SELECT name, score
      FROM high_scores
      ORDER BY score DESC
      LIMIT 10
    `;
    return NextResponse.json({ scores: rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save score." }, { status: 500 });
  }
}
