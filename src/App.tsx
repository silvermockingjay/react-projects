import { Provider } from 'react-redux';
import { store } from './app/store';
import { MainPage } from './pages/MainPage';
import './App.css';

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </div>
  );
}
