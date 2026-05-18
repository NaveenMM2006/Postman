import { NextResponse } from "next/server";

import {
    getCollections,
    createCollection,
} from "@/services/collection.service";


export async function GET() {
    const collections = await getCollections();

    return NextResponse.json(collections);
}

export async function POST(req: Request) {
    const body = await req.json();

    const collection = await createCollection(body.name);

    return NextResponse.json(collection);
}