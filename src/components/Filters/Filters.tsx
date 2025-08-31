interface FiltersProp {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: string[] | number[];
}

export function Filters({ onChange, data }: FiltersProp) {
  return (
    <label>
      Filter by:
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
