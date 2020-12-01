import debounce from 'lodash.debounce';

export default function Filters({ setValue, value }) {
  const delayedSetValue = debounce((val) => setValue(val), 400);

  function inputHandler(event) {
    delayedSetValue(event.target.value);
  }

  return (
    <div className="flex justify-between p-2 my-6 rounded bg-blue-gray-200">
      Filters
      <input
        onChange={inputHandler}
        className="w-full px-1 ml-2 bg-white"
        defaultValue={value}
      />
    </div>
  );
}
