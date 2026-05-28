import { NextResponse } from "next/server";

import {
  saveRequest,
  getRequests,
} from "@/services/collection.service";

export async function GET(
  req: Request
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const collectionId =
      searchParams.get(
        "collectionId"
      );

    const requests =
      await getRequests(
        Number(collectionId)
      );

    return NextResponse.json(
      requests
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

    await saveRequest(body);

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