import { sql } from "@vercel/postgres";

const UserListPage = async () => {
  const data = await sql`SELECT * FROM users ORDER BY id;`;
  const { rows } = data;

  return <div>{JSON.stringify(rows)}</div>;
};

export default UserListPage;
