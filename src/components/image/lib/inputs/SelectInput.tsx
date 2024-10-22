// src/components/image/inputs/SelectInput.tsx
export interface SelectInputProps {
  options: { value: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ options, onChange, }) => (
  <select className="mb-4 p-1 m-1 border rounded" onChange={onChange}>
    {options.map((option: any) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
