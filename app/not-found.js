import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <h1 className="text-8xl font-extrabold text-stone-200 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-stone-700 mb-3">
          Pagina nu a fost găsită
        </h2>
        <p className="text-stone-500 mb-8">
          Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-700 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-800 transition-colors"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  );
}
