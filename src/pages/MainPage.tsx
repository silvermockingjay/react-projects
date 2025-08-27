import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { countriesAdded } from '../app/features/countriesSlice';
import { countries } from '..//utils/countries';
import { RHFForm } from '../components/RHFForm/RHFForm';

export function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(countriesAdded(countries));
  }, [dispatch]);
  return (
    <main>
      <RHFForm />
    </main>
  );
}
