const DateField: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ name, value, onChange, required }) => (
  <div>
    <label htmlFor={name}>Дата народження</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default DateField;
