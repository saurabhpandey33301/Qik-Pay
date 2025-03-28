"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
        <p className="mt-4 text-gray-700">Oops! Something went wrong.</p>
        {error && <p className="text-sm text-gray-600 mt-2">Error: {error}</p>}
        <a href="/home" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading error details...</div>}>
      <ErrorMessage />
    </Suspense>
  );
}
