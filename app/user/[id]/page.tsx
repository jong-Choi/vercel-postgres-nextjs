import { sql } from "@vercel/postgres";

const UserPage = async ({ params }: { params: { id: string } }) => {
  const data = await sql`SELECT * FROM users WHERE id=${params.id}`;
  const { rows } = data;

  return <div>{JSON.stringify(rows)}</div>;
};

export default UserPage;
