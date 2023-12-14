import { sql } from "@vercel/postgres";

const UserListPage = async () => {
  const data = await sql`SELECT * FROM users`;
  const { rows } = data;

  return <div>{JSON.stringify(rows)}</div>;
};

export default UserListPage;
