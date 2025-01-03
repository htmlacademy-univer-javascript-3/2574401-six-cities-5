import { useAppSelector } from '@/hooks/redux';
import FavoritesList from '@components/FavoritesList/FavoritesList';
import { Spinner } from '@components/Spinner/Spinner';
import { selectFavorites } from '@/store/slices/data';

import { RootState } from '@/store/root-reducer';

/**
 * Компонент страницы избранного
 * Отображает список избранных предложений
 */
const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavorites);
  const { isLoading, error } = useAppSelector((state: RootState) => state.data);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Произошла ошибка</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavoritesList offers={favorites} />
        </section>
      </div>
    </main>
  );
};

export default FavoritesPage;
