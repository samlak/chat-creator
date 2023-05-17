export default function Authentication() {
  return (
    <div className='text-center rounded-md border-2 border-dashed border-gray-300 py-10 max-w-xl mx-auto'>
      <p className="mt-1 text-center text-gray-500 mb-6">
        You are not authenticated. <br/>
        Please Sign In with Google to continue.
      </p>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-indigo-800 bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm"
      >
        Continue with Google
      </button>
    </div>
  );
}
