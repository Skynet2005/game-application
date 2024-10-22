type ImageSelectInputProps<T> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

const ImageSelectInput = <T extends string | number>({
  options,
  value,
  onChange,
}: ImageSelectInputProps<T>) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value as T)}
    className="w-[100px] text-center text-neutral-300 rounded ml-5"
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default ImageSelectInput;
