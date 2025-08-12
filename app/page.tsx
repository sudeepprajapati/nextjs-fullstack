import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold">Reel AI — Home</h1>
        <p className="text-gray-600">
          Welcome! This project will use ImageKit + AI features to let users upload and create Instagram-style reels.
        </p>

        <div className="flex gap-3 justify-center">
          <Link href="/register" className="px-4 py-2 rounded bg-blue-600 text-white">Register</Link>
          <Link href="/login" className="px-4 py-2 rounded border border-gray-300">Login</Link>
        </div>

        <div className="mt-6 text-left">
          <h2 className="font-semibold">Next steps / suggestions</h2>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Integrate ImageKit upload widget on a protected route (after auth)</li>
            <li>Use ImageKit AI features on the server or via ImageKit SDK to transform reels</li>
            <li>Store reel metadata in your database (MongoDB suggested)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
