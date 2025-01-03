import { FormEvent, useState, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux';
import { login } from '@/store/api-actions';

/**
 * Компонент формы авторизации
 */
const LoginFormComponent = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value: string) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    return hasLetter && hasNumber;
  };

  const handleSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('Password must contain at least one letter and one number');
      return;
    }

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err: { message: string }) => {
        setError(err.message || 'Произошла ошибка при входе');
      });
  }, [dispatch, email, password, navigate]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!validatePassword(value)) {
      setPasswordError('Password must contain at least one letter and one number');
    } else {
      setPasswordError('');
    }
  }, []);

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
          onChange={handleEmailChange}
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
          onChange={handlePasswordChange}
          data-testid="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$"
        />
        {passwordError && (
          <div className="login__error" data-testid="password-error">
            {passwordError}
          </div>
        )}
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
});

LoginFormComponent.displayName = 'LoginForm';

export default LoginFormComponent;
