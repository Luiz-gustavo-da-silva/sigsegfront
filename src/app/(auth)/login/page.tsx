import Link from "next/link";
import LoginForm from "./login-form";
import { auth } from  "../../../../auth"
import { redirect } from "next/navigation";

export default async function Login() {

  const session = await auth();

  if(session){
    return redirect('/dashboard')
  }

  return (
    <div className="w-full lg:w-2/5 bg-white flex flex-col justify-center items-center p-8 rounded-2xl shadow-md">
      <div className="max-w-sm w-full">
        <div className="flex justify-center mb-6">
        <Link href="/">
            <div className="text-3xl font-bold text-[#3065ac]">SIG-SEG</div>
        </Link>
        </div>
        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
          Seja bem-vindo!
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Por favor insira seus dados
        </p>

        <LoginForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/signup" className="text-[#3065ac] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
