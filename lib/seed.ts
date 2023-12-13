import { sql } from "@vercel/postgres";

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `;

  console.log(`Created "users" table`);

  const users = await Promise.all([
    sql`
          INSERT INTO users (username, email)
          VALUES ('Guillermo Rauch', 'rauchg@vercel.com')
          ON CONFLICT (email) DO NOTHING;
      `,
  ]);
  console.log(`Seeded ${users.length} users`);

  return {
    createTable,
    users,
  };
}
