import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const body = await req.json();

        const {
            url,
            method,
            headers,
            requestBody,
        } = body;

        const startTime = Date.now();

        const response = await fetch(url, {
            method,
            headers,
            body : 
             method !== "GET" &&
             method !== "POST"
              ? JSON.stringify(requestBody)
              : undefined,
        });

        const endTime = Date.now();

        const responseText = await response.text();

        let responseData;

        try {
            responseData = JSON.parse(responseText);
        }catch{
            responseData = responseText;
        }
        return NextResponse.json({
            success: true,
            status: response.status,
            statusText : response.statusText,
            headers : Object.fromEntries(
                response.headers.entries()
            ),
            data: responseData,
            time: endTime - startTime,
        });
        
    }catch(error: any) { 
        return NextResponse.json({
            success : false,
            error : error.message,
        },
        {
            status : 500,
        }
    );
    }
    
}