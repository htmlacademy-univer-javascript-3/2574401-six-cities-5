import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { AuthorizationStatus } from '@/store/slices/user';
import { changeCity } from '@/store/slices/app';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

/**
 * Страница авторизации
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const cities = useAppSelector((state) => state.app.cities);

  // Получаем случайный город если массив не пустой
  const randomCity = cities.length > 0 ? cities[Math.floor(Math.random() * cities.length)] : null;

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  /**
   * Обработчик клика по ссылке города
   * @param evt - событие клика
   */
  const handleCityClick = useCallback((evt: React.MouseEvent) => {
    evt.preventDefault();
    if (randomCity) {
      dispatch(changeCity(randomCity));
      navigate('/');
    }
  }, [dispatch, navigate, randomCity]);

  return (
    <div className="page page--gray page--login" data-testid="login-page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login" data-testid="login-main">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          {randomCity && (
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a
                  className="locations__item-link"
                  href="#"
                  onClick={handleCityClick}
                  data-testid="random-city-link"
                >
                  <span>{randomCity.name}</span>
                </a>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
