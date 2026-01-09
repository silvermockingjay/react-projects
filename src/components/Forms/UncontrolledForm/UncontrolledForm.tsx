import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCountries } from '../../../app/features/countriesSlice';
import { convertToBase64 } from '../../../utils/convertToBase64';
import { dataSubmitted } from '../../../app/features/formsSlice';
import type { FormProps } from '../RHFForm/RHFForm';
import { schema } from '../../../utils/schema';
import { ValidationError } from 'yup';
import { calcPasswordStrength } from '../../../utils/calcPasswordStrength';
import styles from '../Forms.module.css';

interface FormErrors {
  name?: string[];
  age?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  gender?: string[];
  acceptTerms?: string[];
  picture?: string[];
  country?: string[];
}

export function UncontrolledForm({ closeForm }: FormProps) {
  const dispatch = useAppDispatch();
  const myCountries = useAppSelector(selectCountries);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    let pictureBase64: string = '';
    if (file) pictureBase64 = await convertToBase64(file);
    const formattedData = {
      name: data.name as string,
      age: Number(data.age),
      email: data.email as string,
      password: data.password as string,
      confirmPassword: data.confirmPassword as string,
      gender: data.gender as string,
      acceptTerms: data.acceptTerms === 'on',
      picture: [data.picture],
      country: data.country as string,
    };
    try {
      const validData = await schema.validate(formattedData, {
        abortEarly: false,
      });
      if (validData) {
        dispatch(
          dataSubmitted({
            ...formattedData,
            picture: pictureBase64,
          })
        );
        closeForm();
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string[]> = {};
        error.inner.forEach((error) => {
          if (error.path && error.message) {
            errors[error.path] = [...(errors[error.path] ?? []), error.message];
          }
        });
        setErrors(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formField}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" autoComplete="on" />
        {errors.name?.map((message, i) => (
          <p key={`name-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" autoComplete="on" />
        {errors.age?.map((message, i) => (
          <p key={`age-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="on" />
        {errors.email?.map((message, i) => (
          <p key={`email-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) =>
            setPasswordStrength(calcPasswordStrength(e.target.value))
          }
        />
        {errors.password?.map((message, i) => (
          <p key={`password-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
        {passwordStrength !== '' && (
          <p
            className={`${styles.passwordStrength} ${styles[passwordStrength]}`}
          >
            Password strength: {passwordStrength}
          </p>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />
        {errors.confirmPassword?.map((message, i) => (
          <p key={`confirmPassword-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <p>Gender</p>
        <div className={styles.formFieldInline}>
          <label htmlFor="male">Male</label>
          <input type="radio" value="Male" id="male" name="gender" />
          <label htmlFor="male">Female</label>
          <input type="radio" value="Female" id="female" name="gender" />
        </div>
        {errors.gender?.map((message, i) => (
          <p key={`gender-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <div className={styles.formFieldInline}>
          <label htmlFor="agreement">I accept T&C agreement</label>
          <input type="checkbox" id="agreement" name="acceptTerms" />
        </div>
        {errors.acceptTerms?.map((message, i) => (
          <p key={`agreement-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="country">Country</label>
        <input
          list="countries"
          id="country"
          name="country"
          placeholder="Select a country"
        />
        <datalist id="countries">
          {myCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </datalist>
        {errors.country?.map((message, i) => (
          <p key={`country-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="picture">Upload a picture</label>
        <div className={styles.formFieldInline}>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            id="picture"
            name="picture"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFile(file);
            }}
          />
        </div>
        {errors.picture?.map((message, i) => (
          <p key={`picture-${i}`} className={styles.formErrors}>
            {message}
          </p>
        ))}
      </div>
      <button className="button submit" type="submit">
        Submit
      </button>
    </form>
  );
}
