export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white">
      <div className="text-center animate-fade-in">
        <div className="relative">
          {/* Main spinner */}
          <div className="w-24 h-24 border-4 border-gold/20 rounded-full animate-spin border-t-cardinal mx-auto" />

          {/* Inner spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-cardinal/20 rounded-full animate-spin border-b-gold" />
          </div>
        </div>

        <p className="mt-6 text-lg text-charcoal font-baloo font-medium animate-slide-up">
          Loading ISU VSA...
        </p>

        <div className="mt-4 h-1 w-32 bg-gradient-cardinal-gold rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  )
}