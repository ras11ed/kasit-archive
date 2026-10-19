import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KASIT Archive",
  description: "AI-Centered Quality Assurance and Archiving System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}