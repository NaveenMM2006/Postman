import db from "@/lib/db";

export async function getCollections() { 
    const [rows] = await db.query(
        "SELECT * FROM collections ORDER BY created_at DESC"
    );

    return rows;
}

export async function createCollection(name: string) {
    const [result]: any = await db.query(
        "INSERT INTO collections(name) VALUES(?)",
        [name]
    );

    return {
        id: result.insertId,
        name,
    };
}