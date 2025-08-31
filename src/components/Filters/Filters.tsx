interface FiltersProp {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Filters({ onChange }: FiltersProp) {
  return (
    <label>
      Filter by:
      <select onChange={onChange}>
        <option value="name">Name</option>
        <option value="population/asc">Population (asc)</option>
        <option value="population/desc">Population (desc)</option>
      </select>
    </label>
  );
}
