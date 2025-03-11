import Image from "next/image";
import logo from '../assets/capa1.png';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full h-full flex flex-col lg:flex-row justify-center">
          <div className="w-full lg:w-3/5 bg-gray-100 lg:flex items-center justify-center mb-6 lg:mb-0 hidden">
            <Image src={logo} alt="Illustration" />
          </div>

          {children}
        </div>
      </div>
      
    </section>
  );
}
