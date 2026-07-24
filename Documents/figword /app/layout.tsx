import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KechuaMitra — Annadata's Digital Ally",
  description: "An Indian-first agritech platform designed by startups and agronomists to help Indian farmers make smarter decisions using soil, weather, mandi prices, and AI advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
