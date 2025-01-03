import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('@/components/LoginForm', () => {
  const mockDispatch = vi.fn().mockReturnValue({
    unwrap: () => Promise.resolve()
  });

  const mockStore = configureStore({
    reducer: {
      user: () => ({
        authorizationStatus: 'NO_AUTH',
        userInfo: null
      })
    }
  });

  mockStore.dispatch = mockDispatch;

  const renderWithRouter = (component: React.ReactNode) => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: component
      }
    ], {
      initialEntries: ['/']
    });

    return render(
      <Provider store={mockStore}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен отправлять форму с корректными данными', async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('должен показывать ошибку при неудачной попытке входа', async () => {
    mockDispatch.mockImplementationOnce(() => ({
      unwrap: () => Promise.reject({ message: 'Invalid credentials' })
    }));

    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'valid1');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid credentials');
    });
  });

  it('должен перенаправлять на главную страницу после успешного входа', async () => {
    const { container } = renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(container.ownerDocument.location.pathname).toBe('/');
    });
  });

  it('должен требовать заполнения обязательных полей', () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('должен проверять валидность email', async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByTestId('email');
    await userEvent.type(emailInput, 'invalid-email');

    await waitFor(() => {
      expect(emailInput).toBeInvalid();
    });

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');

    await waitFor(() => {
      expect(emailInput).toBeValid();
    });
  });

  it('должен проверять валидность пароля', async () => {
    renderWithRouter(<LoginForm />);

    const passwordInput = screen.getByTestId('password');

    // Только буквы
    await userEvent.type(passwordInput, 'onlyletters');
    expect(screen.getByTestId('password-error')).toBeInTheDocument();

    // Только цифры
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, '12345');
    expect(screen.getByTestId('password-error')).toBeInTheDocument();

    // Валидный пароль
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password123');
    expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
  });
});
