import type { CountriesData } from '../../interfaces/interfaces';
import { use } from 'react';
import { getDataForTable } from '../../services/getData';

interface TableProps {
  year: number;
  search: string;
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  optionalCol: string[];
}

export function Table({
  year,
  search,
  sortBy,
  sortOrder,
  optionalCol,
}: TableProps) {
  const data: CountriesData = use(getDataForTable());
  let countriesData = Object.entries(data);
  if (search) {
    countriesData = countriesData.filter(
      ([country]) => country.toLowerCase() === search.trim().toLowerCase()
    );
  }
  if (year) {
    countriesData = countriesData.map(([country, info]) => {
      const filteredData = info.data.filter(
        (yearData) => yearData.year === year
      );
      return [country, { ...info, data: filteredData }];
    });
  } else {
    countriesData = countriesData.map(([country, info]) => {
      const filteredData = [info.data[info.data.length - 1]];
      return [country, { ...info, data: filteredData }];
    });
  }

  if (sortBy === 'population' && sortOrder === 'asc') {
    countriesData.sort(
      (a, b) => (a[1].data[0].population ?? 0) - (b[1].data[0].population ?? 0)
    );
  } else if (sortBy === 'population' && sortOrder === 'desc') {
    countriesData.sort(
      (a, b) => (b[1].data[0].population ?? 0) - (a[1].data[0].population ?? 0)
    );
  } else if (sortBy === 'name') {
    countriesData.sort((a, b) => a[0].localeCompare(b[0]));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>ISO Code</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO2</th>
          <th>CO2 per capita</th>
          {optionalCol.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {countriesData.map(([country, info]) => (
          <tr key={country}>
            <td>{country}</td>
            <td>{info.iso_code ?? 'N/A'}</td>
            <td>{info.data[0].year}</td>
            <td>{info.data[0].population ?? 'N/A'}</td>
            <td>{info.data[0].co2 ?? 'N/A'}</td>
            <td>{info.data[0].co2_per_capita ?? 'N/A'}</td>
            {optionalCol.map((col) => (
              <td key={col}>{info.data[0][col] ?? 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
