import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '@pages/MainPage/MainPage';
import LoginPage from '@pages/LoginPage/LoginPage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import OfferPage from '@pages/OfferPage/OfferPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import { Spinner } from '@components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchOffers } from './store/api-actions';
import { selectOffers } from './store/slices/app';
import { RootState } from './store/root-reducer';
import { DataState } from './store/slices/data';

export const App = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffers);
  const { isLoading, error } = useAppSelector((state: RootState): DataState => state.data);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage offers={offers} reviews={[]} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
