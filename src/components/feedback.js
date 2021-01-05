import { useState } from 'react';

export default function Feedback() {
  const [formState, setFormState] = useState({
    data: '',
    error: null,
    input: '',
    loading: false,
  });

  function submitHandler(event) {
    event.preventDefault();

    setFormState({
      ...formState,
      loading: true,
    });

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ message: formState.input }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setFormState({
            data: 'Thanks for your feedback!',
            error: null,
            input: '',
            loading: false,
          });
          return;
        }
        setFormState({
          ...formState,
          data: '',
          error: 'Oops, something went wrong. Please try again',
          loading: false,
        });
      })
      .catch(() => {
        setFormState({
          ...formState,
          data: '',
          error: 'Oops, something went wrong. Please try again',
          loading: false,
        });
      });
  }

  return (
    <div className="p-3 mb-4 bg-white border rounded bg-blue-50 border-blue-gray-200">
      <h3 className="text-lg font-bold text-gray-900">
        Want to share feedback with us?{' '}
        <span className="text-sm text-gray-500">(Anonymous)</span>
      </h3>
      <form onSubmit={submitHandler}>
        <textarea
          required
          value={formState.input}
          className="block w-full h-20 border"
          onChange={(event) => setFormState({ input: event.target.value })}
        />
        <button
          type="submit"
          className="px-2 py-1 mt-2 text-white bg-green-500 rounded-lg"
        >
          Send Feedback
        </button>
        {formState.error && (
          <span className="pl-4 text-red-700">🛑 {formState.error}</span>
        )}
        {formState.data && (
          <span className="pl-4 text-green-700">✅ {formState.data}</span>
        )}
        {formState.loading && (
          <span className="pl-4 text-gray-700">⏳ Sending&hellip;</span>
        )}
      </form>
    </div>
  );
}
