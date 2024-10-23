import { Link } from 'react-router-dom';

/**
 * Компонент страницы 404
 * Отображает сообщение об ошибке и ссылку на главную страницу
 *
 * @kind component
 */
const NotFoundPage = () => (
  <div className="page page--gray page--not-found">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--not-found">
      <div className="container">
        <h1>404 Not Found</h1>
        <p>Извините, страница не найдена.</p>
        <Link to="/">Вернуться на главную страницу</Link>
      </div>
    </main>
  </div>
);

export default NotFoundPage;
