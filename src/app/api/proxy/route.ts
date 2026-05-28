// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try{
//         const body = await req.json();

//         const {
//             url,
//             method,
//             headers,
//             requestBody,
//         } = body;

//         const startTime = Date.now();

//         const response = await fetch(url, {
//             method,
//             headers,
//             body : 
//              method !== "GET" &&
//              method !== "POST"
//               ? JSON.stringify(requestBody)
//               : undefined,
//         });

//         const endTime = Date.now();

//         const responseText = await response.text();

//         let responseData;

//         try {
//             responseData = JSON.parse(responseText);
//         }catch{
//             responseData = responseText;
//         }
//         return NextResponse.json({
//             success: true,
//             status: response.status,
//             statusText : response.statusText,
//             headers : Object.fromEntries(
//                 response.headers.entries()
//             ),
//             data: responseData,
//             time: endTime - startTime,
//         });
        
//     }catch(error: any) { 
//         return NextResponse.json({
//             success : false,
//             error : error.message,
//         },
//         {
//             status : 500,
//         }
//     );
//     }
    
// }
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      url,
      method,
      headers,
      requestBody,
    } = body;

    if (!url) {

      return NextResponse.json(
        {
          success: false,
          error:
            "URL is required",
        },
        {
          status: 400,
        }
      );
    }

    let parsedHeaders = {};

    try {

      parsedHeaders =
        typeof headers ===
        "string"
          ? headers.trim()
            ? JSON.parse(headers)
            : {}
          : headers || {};

    } catch {

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Headers JSON",
        },
        {
          status: 400,
        }
      );
    }

    let parsedBody: any = {};

    try {

      parsedBody =
        typeof requestBody ===
        "string"
          ? requestBody.trim()
            ? JSON.parse(
                requestBody
              )
            : {}
          : requestBody || {};

    } catch {

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Body JSON",
        },
        {
          status: 400,
        }
      );
    }

    const startTime =
      Date.now();

    const response =
      await fetch(url, {
        method,

        headers:
          parsedHeaders,

        body:
          method !== "GET"
            ? JSON.stringify(
                parsedBody
              )
            : undefined,
      });

    const endTime =
      Date.now();

    const responseText =
      await response.text();

    let responseData;

    try {

      responseData =
        JSON.parse(
          responseText
        );

    } catch {

      responseData =
        responseText;
    }

    return NextResponse.json({
      success: true,

      status:
        response.status,

      statusText:
        response.statusText,

      headers:
        Object.fromEntries(
          response.headers.entries()
        ),

      data:
        responseData,

      time:
        endTime - startTime,
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