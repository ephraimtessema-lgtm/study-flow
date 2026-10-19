import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-slate-800">Page not found</h1>
      <p className="mt-2 text-slate-500">That route does not exist in StudyFlow.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
