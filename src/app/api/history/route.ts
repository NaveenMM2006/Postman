import { NextResponse } from "next/server";

import {
  saveHistory,
  getHistory,
} from "@/services/history.service";

export async function GET() {

  try {

    const history =
      await getHistory();

    return NextResponse.json(
      history
    );

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    await saveHistory(body);

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}