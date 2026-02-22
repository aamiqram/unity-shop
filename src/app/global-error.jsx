// app/global-error.jsx
"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600">Critical Error</h1>
            <p className="text-gray-600 mt-2">
              Something went wrong on our end.
            </p>
            <button
              onClick={() => reset()}
              className="mt-4 px-6 py-2 bg-[#FF6600] text-white rounded-md hover:bg-[#e65c00]"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
