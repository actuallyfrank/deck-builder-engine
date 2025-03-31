export interface InputProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

export const Input = ({ name, value, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      onChange(0);
      return;
    }

    const parsedValue = parseFloat(e.target.value);
    if (isNaN(parsedValue)) {
      return;
    }

    onChange(parsedValue);
  };

  return (
    <label>
      {name}
      <input value={value} onChange={handleChange} />
    </label>
  );
};
