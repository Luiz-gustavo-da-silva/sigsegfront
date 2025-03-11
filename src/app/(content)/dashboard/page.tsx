import logoutAction from "@/app/(auth)/(logout)/logoutAction";
import Form from "next/form";

export default async function Dashboard() {
  return (
    <>
      <Form action={logoutAction}>
        <button className="w-full py-2 px-4 rounded-md bg-[#378c77] text-white  transition">
          Logout
        </button>
      </Form>

      <h1>Olá!</h1>
    </>
  );
}
