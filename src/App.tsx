import { Offer } from './components/OfferCard/OfferCard';
import MainPage from './pages/MainPage/MainPage';

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
export const App = ({offers}: AppProps) => <MainPage offers={offers} />;

export default App;
