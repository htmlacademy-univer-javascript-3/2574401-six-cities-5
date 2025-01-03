import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { AuthorizationStatus } from '@/store/slices/user';

/**
 * Пропсы компонента GuestRoute
 */
interface GuestRouteProps {
  /** Дочерние элементы */
  children: JSX.Element;
}

/**
 * Компонент для защиты маршрутов от авторизованных пользователей
 * Перенаправляет на главную страницу, если пользователь авторизован
 */
const GuestRoute = ({ children }: GuestRouteProps): JSX.Element => {
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  return children;
};

export default GuestRoute;
