import { NextResponse } from "next/server";

import {
  saveHistory,
  getHistory,
  deleteHistory,
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
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing history id" },
      { status: 400 }
    );
  }

  await deleteHistory(Number(id));

  return NextResponse.json({ success: true });
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