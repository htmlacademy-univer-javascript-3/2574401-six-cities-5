import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { login } from '@/store/api-actions';

/**
 * Компонент формы авторизации
 */
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setError('');

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err: { message: string }) => {
        setError(err.message || 'Произошла ошибка при входе');
      });
  };

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      {error && (
        <div className="login__error" data-testid="error-message">
          {error}
        </div>
      )}
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="email"
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password"
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
