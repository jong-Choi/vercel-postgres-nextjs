import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const insertUser = async (formData: FormData) => {
  "use server";

  try {
    await sql`INSERT INTO users (username, email)
    VALUES (${String(formData.get("username"))}, ${String(
      formData.get("email")
    )})
    ON CONFLICT (email) DO NOTHING;`;
    revalidatePath("/user");
  } catch (e) {
    console.log(e);
  }
};

const UserCreatingPage = () => {
  return (
    <form action={insertUser}>
      <input name="username" placeholder="이름을 입력하세요" />
      <input name="email" type="email" placeholder="이메일을 입력하세요" />
      <button type="submit">전송하기</button>
    </form>
  );
};

export default UserCreatingPage;
