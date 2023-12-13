import { seed } from "@/lib/seed";
import { sql } from "@vercel/postgres";

export default async function Home() {
  let data;

  try {
    data = await sql`SELECT * FROM users`;
  } catch (e: any) {
    if (e.message.includes('relation "users" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
      data = await sql`SELECT * FROM users`;
    } else {
      throw e;
    }
  }

  const { rows: users } = data;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}
