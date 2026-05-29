export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-[3px] border-green-100 border-t-green-700 rounded-full animate-spin" />
        <p className="text-sm text-stone-400 font-medium">Se încarcă...</p>
      </div>
    </div>
  );
}
