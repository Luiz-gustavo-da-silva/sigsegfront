import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIG-SEG",
  description: "Aplicação de gerenciamento de denuncias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>  
        {children}
      </body>
    </html>
  );
}
