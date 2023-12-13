import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT * from CARTS where user_id=1`;

  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.quantity}
        </div>
      ))}
    </div>
  );
}
