export function calcPasswordStrength(password: string): string {
  let strength = 0;
  if (/(?=.*[0-9])/.test(password)) strength++;
  if (/(?=.*[A-Z])/.test(password)) strength++;
  if (/(?=.*[a-z])/.test(password)) strength++;
  if (/(?=.*[#?!@$%^&*-])/.test(password)) strength++;
  if (password.length >= 8) strength++;

  switch (strength) {
    case 1:
    case 2:
      return 'weak';
    case 3:
    case 4:
      return 'average';
    case 5:
      return 'strong';
    default:
      return '';
  }
}
