export default function ProductsLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-40 bg-stone-200 rounded-full animate-pulse mb-3" />
          <div className="h-8 w-48 bg-stone-200 rounded-xl animate-pulse mb-1" />
          <div className="h-4 w-24 bg-stone-100 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter pills skeleton */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 bg-stone-200 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="aspect-square bg-stone-100" />
              <div className="p-4">
                <div className="h-4 w-16 bg-stone-100 rounded-full mb-2" />
                <div className="h-4 w-full bg-stone-100 rounded-lg mb-1" />
                <div className="h-4 w-3/4 bg-stone-100 rounded-lg mb-3" />
                <div className="h-5 w-20 bg-stone-100 rounded-lg mb-3" />
                <div className="h-9 w-full bg-stone-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
