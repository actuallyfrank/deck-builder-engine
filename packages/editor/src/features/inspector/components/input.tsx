import "./input.css";

export interface InputProps<T extends number | string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  type?: "number" | "text";
}

export const Input = <T extends number | string>({
  name,
  value,
  onChange,
  type = typeof value === "number" ? "number" : "text",
}: InputProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (type === "number") {
      if (inputValue === "") {
        onChange(0 as T);
        return;
      }

      const parsedValue = parseFloat(inputValue);
      if (!isNaN(parsedValue)) {
        onChange(parsedValue as T);
      }

      return;
    }

    onChange(inputValue as T);
  };

  return (
    <label className="input-label">
      <span className="input-name">{name}</span>
      <input
        className="input-field"
        value={value}
        onChange={handleChange}
        type={type}
      />
    </label>
  );
};
