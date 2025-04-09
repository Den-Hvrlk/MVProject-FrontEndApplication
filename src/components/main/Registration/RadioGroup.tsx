const RadioGroup: React.FC<{
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, options, selectedValue, onChange }) => (
  <div className="sex-options">
    {options.map(({ label, value }) => (
      <label key={value}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={selectedValue === value}
          onChange={onChange}
        />
        {label}
      </label>
    ))}
  </div>
);

export default RadioGroup;
