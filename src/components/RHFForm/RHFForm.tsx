import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';
import { useState } from 'react';
import type { InferType } from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCountries } from '../../app/features/countriesSlice';
import { dataSubmitted } from '../../app/features/formsSlice';
import { convertToBase64 } from '../../utils/convertToBase64';
import { calcPasswordStrength } from '../../utils/calcPasswordStrength';

import styles from './RHFForm.module.css';

type RHFForm = InferType<typeof schema>;

export function RHFForm() {
  const dispatch = useAppDispatch();
  const myCountries = useAppSelector(selectCountries);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      age: undefined as unknown as number,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      picture: undefined,
      country: '',
    },
  });

  const password = watch('password');
  const passwordStrength = calcPasswordStrength(password);

  const onSubmit: SubmitHandler<RHFForm> = async (data) => {
    let pictureBase64: string = '';
    if (file) pictureBase64 = await convertToBase64(file);
    const formattedData = {
      ...data,
      picture: pictureBase64,
    };
    dispatch(dataSubmitted(formattedData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.formField}>
        <label htmlFor="name">Name</label>
        <input type="text" {...register('name')} id="name" autoComplete="on" />
        {errors.name && (
          <p className={styles.formErrors}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="age">Age</label>
        <input type="number" {...register('age')} id="age" autoComplete="on" />
        {errors.age && (
          <p className={styles.formErrors}>{errors.age.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          {...register('email')}
          id="email"
          autoComplete="on"
        />
        {errors.email && (
          <p className={styles.formErrors}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} id="password" />
        {errors.password && (
          <p className={styles.formErrors}>{errors.password.message}</p>
        )}
        {passwordStrength !== '' && (
          <p className={styles.PasswordStrength}>
            Password strength: {passwordStrength}
          </p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword')}
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <p className={styles.formErrors}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <p>Gender</p>
        <div className={styles.formFieldInline}>
          <label htmlFor="male">Male</label>
          <input type="radio" value="Male" {...register('gender')} id="male" />
          <label htmlFor="male">Female</label>
          <input
            type="radio"
            value="Female"
            {...register('gender')}
            id="female"
          />
        </div>
        {errors.gender && (
          <p className={styles.formErrors}>{errors.gender.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <div className={styles.formFieldInline}>
          <label htmlFor="agreement">I accept T&C agreement</label>
          <input type="checkbox" {...register('acceptTerms')} id="agreement" />
        </div>
        {errors.acceptTerms && (
          <p className={styles.formErrors}>{errors.acceptTerms.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="country">Country</label>
        <input
          list="countries"
          {...register('country')}
          id="country"
          placeholder="Select a country"
        />
        <datalist id="countries">
          {myCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </datalist>
        {errors.country && (
          <p className={styles.country}>{errors.country.message}</p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="picture">Upload a picture</label>
        <div className={styles.formFieldInline}>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            {...register('picture')}
            id="picture"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFile(file);
            }}
          />
        </div>
        {errors.picture && (
          <p className={styles.formErrors}>{errors.picture.message}</p>
        )}
      </div>
      <button className={styles.submitBtn} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
