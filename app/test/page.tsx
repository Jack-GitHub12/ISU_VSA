export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-yellow-400 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Tailwind CSS Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Card 1</h2>
            <p className="text-gray-600">Testing Tailwind styles</p>
          </div>
          
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Card 2</h2>
            <p>Blue background card</p>
          </div>
          
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Card 3</h2>
            <p>Green background card</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-200 rounded-lg">
          <p className="text-lg text-gray-800">
            If you can see colors and proper layout, Tailwind CSS is working!
          </p>
        </div>
      </div>
    </div>
  );
}