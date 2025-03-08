"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();

  // Check if we're on a photo detail page
  const isPhotoDetailPage = pathname?.startsWith("/images/");

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-4">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Image Gallery
          </Link>

          {isPhotoDetailPage && (
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
        </div>

        {!isPhotoDetailPage && <SearchBar />}
      </div>
    </header>
  );
}
