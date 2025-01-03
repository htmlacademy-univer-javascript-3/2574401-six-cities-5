import { Link } from 'react-router-dom';
import UserNav from '@/components/UserNav/UserNav';

/**
 * Пропсы компонента Layout
 */
interface LayoutProps {
  /** Дочерние элементы для отображения */
  children: React.ReactNode;
  /** Дополнительные классы для страницы */
  pageClassName?: string;
}

/**
 * Компонент Layout
 * Отображает общий шаблон страницы с хедером и основным контентом
 */
const Layout = ({ children, pageClassName = '' }: LayoutProps) => (
  <div className={`page ${pageClassName}`}>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <UserNav />
        </div>
      </div>
    </header>
    {children}
  </div>
);

export default Layout;
