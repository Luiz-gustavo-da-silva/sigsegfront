import Link from "next/link";
import RegisterForm from './register-form';
import { auth } from  "../../../../auth"
import { redirect } from "next/navigation";

export default async function Signup() {

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
          Crie sua conta!
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Por favor insira seus dados
        </p>

        <RegisterForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#3065ac] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
