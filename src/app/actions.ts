"use server";

import { neon } from "@neondatabase/serverless";

export async function checkIfCodeExists(formData: FormData) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);
  const code = formData.get("suffix");

  const result = await sql`SELECT * FROM urls WHERE code = ${code}`;
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
}

export async function insertUrl(formData: FormData) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);
  const longurl = formData.get("longurl");
  const code = formData.get("suffix");

  const existing = await sql`SELECT 1 FROM urls WHERE code = ${code}`;
  if (existing.length > 0) {
    throw new Error("Code already exists");
  }

  await sql`INSERT INTO urls (url, code) VALUES (${longurl}, ${code})`;
}

export async function getUrlFromCode(code: string) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(databaseUrl);

  const result = await sql`SELECT url FROM urls WHERE code = ${code}`;
  if (result.length > 0) {
    return result[0].url as string;
  } else {
    return null;
  }
}
