import { auth } from  "../../../auth"
import { redirect } from "next/navigation";
import LayoutBase from "../components/layoutBase";


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
    <LayoutBase>
        {children}
    </LayoutBase>
  );
}
