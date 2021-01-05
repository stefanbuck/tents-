export default function Feedback() {
  return (
    <div className="p-6 mb-4 bg-white border rounded bg-blue-50 border-blue-gray-200">
      <h3 className="text-lg font-bold text-gray-900">
        Want to share feedback with us?
      </h3>
      <textarea className="block w-full h-20 border" />
      <button
        type="button"
        className="px-2 py-1 mt-2 text-white bg-green-500 rounded-lg"
      >
        Send Feedback
      </button>
    </div>
  );
}
