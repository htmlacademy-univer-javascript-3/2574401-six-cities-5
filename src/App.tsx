import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@pages/MainPage/MainPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import OfferPage from '@pages/OfferPage/OfferPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import Layout from '@components/Layout/Layout';
import { Spinner } from '@components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchOffers, checkAuth, fetchFavorites } from './store/api-actions';
import { RootState } from './store/root-reducer';
import { DataState } from './store/slices/data';

/**
 * Корневой компонент приложения
 */
export const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState): DataState => state.data);

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(checkAuth());
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout pageClassName="page--gray page--main"><MainPage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Layout><FavoritesPage /></Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/offer/:id"
          element={<Layout><OfferPage /></Layout>}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
