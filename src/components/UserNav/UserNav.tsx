import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/store/api-actions';
import { AuthorizationStatus } from '@/store/slices/user';
import { RootState } from '@/store/root-reducer';

/**
 * Компонент навигации пользователя
 * Отображает информацию о пользователе или ссылку на авторизацию
 */
const UserNavComponent = memo(() => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state: RootState) => state.user.authorizationStatus);
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);
  const favoritesLength = useAppSelector((state: RootState) => state.data.favorites.length) ?? 0;

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (authStatus !== AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="/login">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/login">
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img
                src={userInfo?.avatarUrl}
                alt="User avatar"
                width="20"
                height="20"
              />
            </div>
            <span className="header__user-name user__name">
              {userInfo?.email}
            </span>
            <span className="header__favorite-count">{favoritesLength}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/login" onClick={handleLogout}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
});

UserNavComponent.displayName = 'UserNav';

export default UserNavComponent;
