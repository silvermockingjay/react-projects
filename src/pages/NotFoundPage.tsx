import { useNavigate } from 'react-router';
import { CustomButton } from '../components/CustomButton/CustomButton';

export function NotFoundPage() {
  const navigate = useNavigate();
  const onClick = () => navigate('/');
  return (
    <div>
      <h1>Page not found</h1>
      <p>Sorry, we couldn&#39;t find the page you&#39;re looking for</p>
      <CustomButton
        type="button"
        text="Back to home"
        customClass="backHomeBtn"
        onClick={onClick}
      />
    </div>
  );
}
