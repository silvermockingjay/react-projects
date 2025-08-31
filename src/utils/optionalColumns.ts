import { getData } from '../services/getData';

async function getOptionalCol() {
  const basicFields = [
    'country',
    'iso',
    'population',
    'year',
    'co2',
    'co2_per_capita',
  ];
  const data = await getData();
  const info = Object.values(data);
  const fields = info.flatMap((item) =>
    item.data.flatMap((data) => Object.keys(data))
  );
  const uniqueFields = [...new Set(fields)];
  const optionalFields = uniqueFields.filter(
    (field) => !basicFields.includes(field)
  );
  return optionalFields;
}

const optionalFields = await getOptionalCol();
export default optionalFields;
