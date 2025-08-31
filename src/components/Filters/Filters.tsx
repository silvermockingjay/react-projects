interface FiltersProp {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[] | number[];
  labelTxt: string;
}

export function Filters({ onChange, data, labelTxt }: FiltersProp) {
  return (
    <label>
      {labelTxt}:
      <select onChange={onChange}>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
