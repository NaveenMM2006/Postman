import { NextResponse } from "next/server";

import db from "@/lib/db";


// GET ALL REQUESTS

export async function GET() {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM requests
      ORDER BY id DESC
      `
    );

    return NextResponse.json(rows);

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}


// SAVE REQUEST

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      collection_id,
      name,
      method,
      url,
      headers,
      body: requestBody,
    } = body;

    const [result]: any =
      await db.query(
        `
        INSERT INTO requests
        (
          collection_id,
          name,
          method,
          url,
          headers,
          body
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          collection_id,
          name,
          method,
          url,
          JSON.stringify(headers),
          JSON.stringify(requestBody),
        ]
      );

    return NextResponse.json({

      success: true,

      id: result.insertId,
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}