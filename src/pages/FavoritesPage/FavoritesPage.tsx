import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import FavoritesList from '@components/FavoritesList/FavoritesList';
import { Spinner } from '@components/Spinner/Spinner';
import { fetchFavorites, selectFavorites } from '@/store/slices/data';
import { RootState } from '@/store/root-reducer';


/**
 * Компонент страницы избранного
 * Отображает список избранных предложений
 */
const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const { isLoading, error } = useAppSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-container">
          <h2>Произошла ошибка</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">{favorites.length}</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favorites} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
