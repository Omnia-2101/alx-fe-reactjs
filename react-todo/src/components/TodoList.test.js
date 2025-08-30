import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('renders input and add button', () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText(/enter a task/i)).toBeInTheDocument();
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });

  test('adds a todo item', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Learn Testing' } });
    fireEvent.click(button);

    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  test('toggles a todo item', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Test Toggle' } });
    fireEvent.click(button);

    const todo = screen.getByText('Test Toggle');
    expect(todo).toHaveStyle('text-decoration: none');

    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo item', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const button = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Delete Me' } });
    fireEvent.click(button);

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });
});
