import db from "@/lib/db";

export async function saveHistory(
  data: any
) {

  const {
    method,
    url,
    headers,
    body,
    response,
    status,
  } = data;

  await db.query(
    `
    INSERT INTO request_history
    (
      method,
      url,
      headers,
      body,
      response,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      method,
      url,
      JSON.stringify(headers),
      JSON.stringify(body),
      JSON.stringify(response),
      status,
    ]
  );
}

export async function getHistory() {

  const [rows] = await db.query(
    `
    SELECT *
    FROM request_history
    ORDER BY id DESC
    LIMIT 50
    `
  );

  return rows;
}