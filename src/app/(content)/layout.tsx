import Image from "next/image";
import logo from '../assets/capa1.png';

import { auth } from  "../../../auth"
import { redirect } from "next/navigation";


export default async function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  if(!session){
    redirect('/login')
  }

  return (
    <section>
        {children}
    </section>
  );
}
