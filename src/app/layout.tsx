import type { Metadata } from "next";
import { Toaster } from 'sonner'
import "./globals.css";

export const metadata: Metadata = {
  title: "Life50",
  description: "Top 50 things that changed people's life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-black text-white antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
