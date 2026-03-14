import type { Metadata } from "next";
import "./globals.css";
// import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "DevRoast - Code Roasting AI",
  description: "Paste your code, get roasted by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
