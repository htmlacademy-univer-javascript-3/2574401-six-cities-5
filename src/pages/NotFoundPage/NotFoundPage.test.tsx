import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('@/pages/NotFoundPage', () => {
  const renderWithRouter = () => render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  it('должен отображать сообщение об ошибке 404', () => {
    renderWithRouter();

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Извините, страница не найдена.')).toBeInTheDocument();
  });

  it('должен отображать ссылку на главную страницу', () => {
    renderWithRouter();

    const homeLink = screen.getByText('Вернуться на главную страницу');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('должен отображать логотип с корректной ссылкой', () => {
    renderWithRouter();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const logoImage = screen.getByRole('img', { name: /6 cities logo/i });
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('width', '81');
    expect(logoImage).toHaveAttribute('height', '41');
  });

  it('должен иметь корректные классы для стилизации', () => {
    renderWithRouter();

    expect(screen.getByTestId('not-found-page')).toHaveClass('page', 'page--gray', 'page--not-found');
    expect(screen.getByTestId('not-found-main')).toHaveClass('page__main', 'page__main--not-found');
  });

  it('должен иметь корректную структуру заголовков', () => {
    renderWithRouter();

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404 Not Found');
  });
});
