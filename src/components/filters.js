import debounce from 'lodash.debounce';

export default function Filters({ setValue, value }) {
  const delayedSetValue = debounce((val) => setValue(val), 400);

  function inputHandler(event) {
    delayedSetValue(event.target.value);
  }

  return (
    <div className="flex justify-between p-2 my-8 bg-gray-200 rounded">
      Filters
      <input
        onChange={inputHandler}
        className="w-full px-1 ml-2"
        defaultValue={value}
      />
    </div>
  );
}
