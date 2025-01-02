import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Offer } from '@components/OfferCard/OfferCard';
import MainPage from '@pages/MainPage/MainPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import OfferPage from '@pages/OfferPage/OfferPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';

/**
 * Интерфейс для пропсов компонента App
 */
interface AppProps {
  /**
   * Массив предложений для отображения
   */
  offers: Offer[];
}

/**
 * Основной компонент приложения
 * Отображает главную страницу приложения с предложениями
 *
 * @returns - Приложение
 */
export const App = ({offers}: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage offers={offers} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/favorites" element={
        <PrivateRoute>
          <FavoritesPage offers={offers} />
        </PrivateRoute>
      }
      />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
