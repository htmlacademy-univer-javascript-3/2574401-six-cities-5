import { useAppSelector } from '@/hooks/redux';
import { AuthorizationStatus } from '@/store/slices/user';
import LoginForm from '@/components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
/**
 * Страница авторизации
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authStatus, navigate]);

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
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
