import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './CommentForm';

describe('@/components/CommentForm', () => {
  const handleSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен быть заблокирован при недостаточной длине комментария', async () => {
    render(<CommentForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByRole('textbox');
    const rating = screen.getByTitle('4 stars');

    // Короткий комментарий и рейтинг
    await userEvent.type(textarea, 'Short comment');
    fireEvent.click(rating);

    expect(submitButton).toBeDisabled();
  });

  it('должен быть заблокирован при отсутствии рейтинга', async () => {
    render(<CommentForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByRole('textbox');

    // Достаточно длинный комментарий, но нет рейтинга
    await userEvent.type(textarea, 'This is a very long comment that should be sufficient for submission');

    expect(submitButton).toBeDisabled();
  });

  it('должен отправить форму с корректными данными', async () => {
    render(<CommentForm onSubmit={handleSubmit} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    const textarea = screen.getByRole('textbox');
    const rating = screen.getByTitle('4 stars');

    const comment = 'This is a very long comment that should be sufficient for submission';
    await userEvent.type(textarea, comment);
    fireEvent.click(rating);
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith(comment, 4);
  });

  it('должен очистить форму после отправки', async () => {
    render(<CommentForm onSubmit={handleSubmit} />);

    const textarea = screen.getByRole('textbox');
    const rating = screen.getByTitle('4 stars');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Заполняем и отправляем форму
    await userEvent.type(textarea, 'This is a very long comment that should be sufficient for submission');
    fireEvent.click(rating);
    fireEvent.click(submitButton);

    // Проверяем очистку
    expect(textarea).toHaveValue('');
    expect(screen.getByTitle('4 stars')).not.toBeChecked();
  });

  it('должен блокировать форму при отправке', () => {
    render(<CommentForm onSubmit={() => {}} isSubmitting />);

    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('должен отображать ошибку', () => {
    render(<CommentForm onSubmit={() => {}} error="Test error" />);

    expect(screen.getByTestId('submit-error')).toHaveTextContent('Test error');
  });

  it('не должен позволять отправить отзыв длиннее 300 символов', () => {
    // Добавить тест
  });
});
