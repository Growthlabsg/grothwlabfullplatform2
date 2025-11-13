export default function CallArchivesLoading() {
  return (
    <div className="container py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-8 w-full max-w-md bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
        </div>
      </div>
    </div>
  )
}
