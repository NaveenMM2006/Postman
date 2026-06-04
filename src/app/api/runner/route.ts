import { NextResponse } from "next/server";

import {
  getCollectionRequests,
} from "@/services/collection.service";

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json();

    const {
      collectionId,
    } = body;

    const requests =
      await getCollectionRequests(
        collectionId
      );

    const results = [];

    for (const request of requests) {

      try {

        const start =
          Date.now();

        const response =
          await fetch(
            request.url,
            {
              method:
                request.method,

              headers:
                request.headers
                  ? JSON.parse(
                      request.headers
                    )
                  : {},

              body:
                request.method !==
                "GET"
                  ? request.body
                  : undefined,
            }
          );

        const end =
          Date.now();

        results.push({
          id:
            request.id,

          name:
            request.name,

          method:
            request.method,

          status:
            response.status,

          success:
            response.ok,

          time:
            end - start,
        });

      } catch (error: any) {

        results.push({
          id:
            request.id,

          name:
            request.name,

          method:
            request.method,

          success:
            false,

          error:
            error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        error:
          error.message,
      },
      {
        status: 500,
      }
    );
  }
}