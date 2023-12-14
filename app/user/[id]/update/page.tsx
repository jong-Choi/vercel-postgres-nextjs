import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const updateUser = async (formData: FormData) => {
  "use server";

  try {
    await sql`UPDATE users
    SET username = ${String(formData.get("username"))}, email = ${String(
      formData.get("email")
    )}
    WHERE id = ${String(formData.get("id"))};`;
    revalidatePath(`/`, "layout");
  } catch (e) {
    console.log(e);
  }
};

const UserUpdatingPage = async ({ params }: { params: { id: string } }) => {
  const data = await sql`SELECT * FROM users WHERE id=${params.id}`;
  const { rows } = data;
  const user = rows[0];
  return (
    <form action={updateUser}>
      <input type="hidden" name="id" defaultValue={params.id} />
      <input
        name="username"
        defaultValue={user.username}
        placeholder="이름을 입력하세요"
      />
      <input
        name="email"
        type="email"
        defaultValue={user.email}
        placeholder="이메일을 입력하세요"
      />
      <button type="submit">전송하기</button>
    </form>
  );
};

export default UserUpdatingPage;
