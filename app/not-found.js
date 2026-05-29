import Link from 'next/link';
import { PawPrint } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
          <PawPrint className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-6xl font-bold text-stone-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-stone-700 mb-3">
          Page Not Found
        </h2>
        <p className="text-stone-500 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
