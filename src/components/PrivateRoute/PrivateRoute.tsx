import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { AuthorizationStatus } from '@/store/slices/user';
import { Spinner } from '@/components/Spinner/Spinner';

/**
 * Компонент для приватных маршрутов
 * Перенаправляет на страницу авторизации, если пользователь не авторизован
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);

  if (authStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
