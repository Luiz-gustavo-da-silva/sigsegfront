import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-6">
      <h1 className="text-xl font-bold text-[#3065ac]">SIG-SEG</h1>

      <nav className="hidden lg:flex gap-6">
        <a href="/" className="text-gray-700 hover:text-black">
          Home
        </a>
        <a href="/myReport" className="text-gray-700 hover:text-black">
          Minha Denúncia
        </a>
      </nav>

      <div className="flex gap-6">
        <Link
          href="/signup"
          className="text-black px-4 py-2 rounded-lg hover:text-[#378c77]"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="bg-[#3065ac] text-white px-4 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
