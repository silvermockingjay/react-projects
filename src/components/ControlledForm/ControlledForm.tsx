import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { countries } from '../../utils/countries';
import { useEffect, useState } from 'react';

import styles from './ControlledForm.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  countriesAdded,
  selectCountries,
} from '../../app/features/countriesSlice';
import { dataSubmitted } from '../../app/features/formsSlice';
import { convertToBase64 } from '../../utils/convertToBase64';
import type { SubmitHandler } from 'react-hook-form';

interface ControlledForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList;
  country: string;
}

export function ControlledForm() {
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const fileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
  const dispatch = useAppDispatch();
  const myCountries = useAppSelector(selectCountries);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    dispatch(countriesAdded(countries));
  }, [dispatch]);

  const schema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z][a-zA-Z\s]*$/, 'First letter should be uppercase'),
    age: yup
      .number()
      .required('Age is required')
      .positive('No negative numbers allowed'),
    email: yup
      .string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Expected email format: username@example.com'
      ),
    password: yup
      .string()
      .required('Password is required')
      .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(
        /(?=.*[A-Z])/,
        'Password must contain at least one uppercase letter'
      )
      .matches(
        /(?=.*[a-z])/,
        'Password must contain at least one lowercase letter'
      )
      .matches(
        /(?=.*[#?!@$%^&*-])/,
        'Password must contain at least one special character'
      )
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
      .string()
      .required('Please, confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    gender: yup.string().required('Choose gender'),
    acceptTerms: yup
      .boolean()
      .oneOf([true], 'Accept terms and conditions policies')
      .defined(),
    picture: yup
      .mixed<FileList>()
      .required('Upload a picture')
      .test(
        'size',
        'File should be max 2MB',
        (value) => value && (value as FileList)[0].size <= MAX_FILE_SIZE
      )
      .test(
        'type',
        'Allowed file extensions: jpeg, jpg, png',
        (value) => value && fileExtensions.includes((value as FileList)[0].type)
      ),
    country: yup.string().required('Choose a country'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ControlledForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      picture: {} as FileList,
      country: '',
    },
  });

  const onSubmit: SubmitHandler<ControlledForm> = async (data) => {
    let pictureBase64: string = '';
    if (file) pictureBase64 = await convertToBase64(file);
    const formattedData = {
      ...data,
      picture: pictureBase64,
    };
    dispatch(dataSubmitted(formattedData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input type="text" {...register('name')} id="name" />
      {errors.name && (
        <p className={styles.formErrors}>{errors.name.message}</p>
      )}
      <label htmlFor="age">Age</label>
      <input type="number" {...register('age')} id="age" />
      {errors.age && <p className={styles.formErrors}>{errors.age.message}</p>}
      <label htmlFor="email">Email</label>
      <input type="email" {...register('email')} id="email" />
      {errors.email && (
        <p className={styles.formErrors}>{errors.email.message}</p>
      )}
      <label htmlFor="password">Password</label>
      <input type="password" {...register('password')} id="password" />
      {errors.password && (
        <p className={styles.formErrors}>{errors.password.message}</p>
      )}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        {...register('confirmPassword')}
        id="confirmPassword"
      />
      {errors.confirmPassword && (
        <p className={styles.formErrors}>{errors.confirmPassword.message}</p>
      )}
      <label>Gender</label>
      <input type="radio" value="Male" {...register('gender')} />
      <input type="radio" value="Female" {...register('gender')} />
      {errors.gender && (
        <p className={styles.formErrors}>{errors.gender.message}</p>
      )}
      <label htmlFor="agreement">I accept T&C agreement</label>
      <input type="checkbox" {...register('acceptTerms')} id="agreement" />
      {errors.acceptTerms && (
        <p className={styles.formErrors}>{errors.acceptTerms.message}</p>
      )}
      <label htmlFor="country">Country</label>
      <select autoComplete="on" {...register('country')} id="country">
        <option value="" disabled={true}>
          Select a country
        </option>
        {myCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {errors.country && (
        <p className={styles.country}>{errors.country.message}</p>
      )}
      <label htmlFor="picture">Upload a picture</label>
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
      <button>Upload picture</button>
      {errors.picture && (
        <p className={styles.formErrors}>{errors.picture.message}</p>
      )}
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}
