import * as yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const fileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
export const schema = yup.object({
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
    .optional()
    .test(
      'size',
      'File should be max 2MB',
      (value) => !value || (value as FileList)[0]?.size <= MAX_FILE_SIZE
    )
    .test(
      'type',
      'Allowed file extensions: jpeg, jpg, png',
      (value) => !value || fileExtensions.includes((value as FileList)[0]?.type)
    ),
  country: yup.string().required('Choose a country'),
});
