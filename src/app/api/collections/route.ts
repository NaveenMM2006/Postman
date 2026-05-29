import { NextResponse } from "next/server";

import {
    getCollections,
    createCollection,
    deleteCollection,
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

export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json(
            { error: "Missing collection id" },
            { status: 400 }
        );
    }

    await deleteCollection(Number(id));

    return NextResponse.json({ success: true });
}