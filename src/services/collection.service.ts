// import db from "@/lib/db";

// export async function getCollections() { 
//     const [rows] = await db.query(
//         "SELECT * FROM collections ORDER BY created_at DESC"
//     );

//     return rows;
// }

// export async function createCollection(name: string) {
//     const [result]: any = await db.query(
//         "INSERT INTO collections(name) VALUES(?)",
//         [name]
//     );

//     return {
//         id: result.insertId,
//         name,
//     };
// }
import db from "@/lib/db";

export async function getCollections() {

  const [rows] = await db.query(
    `
    SELECT *
    FROM collections
    ORDER BY created_at DESC
    `
  );

  return rows;
}

export async function createCollection(
  name: string
) {

  const [result]: any =
    await db.query(
      `
      INSERT INTO collections(name)
      VALUES(?)
      `,
      [name]
    );

  return {
    id: result.insertId,
    name,
  };
}

/*
-----------------------------------
SAVE REQUEST
-----------------------------------
*/

export async function saveRequest(
  data: any
) {

  const [result]: any =
    await db.query(
      `
      INSERT INTO saved_requests
      (
        collection_id,
        name,
        method,
        url,
        headers,
        body,
        auth_type,
        auth_value
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.collection_id,
        data.name,
        data.method,
        data.url,
        data.headers,
        data.body,
        data.auth_type,
        data.auth_value,
      ]
    );

  return result;
}

/*
-----------------------------------
GET REQUESTS
-----------------------------------
*/

export async function getRequests(
  collectionId: number
) {

  const [rows] = await db.query(
    `
    SELECT *
    FROM saved_requests
    WHERE collection_id = ?
    ORDER BY created_at DESC
    `,
    [collectionId]
  );

  return rows;
}