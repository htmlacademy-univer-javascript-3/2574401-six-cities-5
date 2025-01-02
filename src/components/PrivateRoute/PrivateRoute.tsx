import { Navigate } from 'react-router-dom';

/**
 * Компонент для приватных маршрутов
 * Перенаправляет на страницу авторизации, если пользователь не авторизован
 *
 * @returns - компонент или перенаправление
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = false; // Пока что всегда не авторизован

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
