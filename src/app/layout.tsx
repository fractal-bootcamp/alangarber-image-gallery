import "./globals.css";
import type { Metadata } from "next";
import SearchBar from "./components/SearchBar";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "A beautiful image gallery built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Image Gallery</h1>
            <SearchBar />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
