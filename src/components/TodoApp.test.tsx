import { render, screen, fireEvent } from '@testing-library/react';
import { TodoApp } from './TodoApp';

// Mock crypto.randomUUID to generate unique IDs
let idCounter = 0;
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => `mock-uuid-${++idCounter}`),
  },
});

describe('TodoApp - Restoration Feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    idCounter = 0; // Reset counter for each test
  });

  it('削除したTodoの取り消し通知が表示される', () => {
    render(<TodoApp />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    fireEvent.change(input, { target: { value: 'テストタスク' } });
    fireEvent.click(addButton);
    
    // Delete the todo
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);
    
    // Check that undo notification appears
    expect(screen.getByText('「テストタスク」を削除しました')).toBeInTheDocument();
    expect(screen.getByText('取り消し')).toBeInTheDocument();
  });

  it('取り消しボタンをクリックすると削除されたTodoが復元される', () => {
    render(<TodoApp />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    fireEvent.change(input, { target: { value: 'テストタスク' } });
    fireEvent.click(addButton);
    
    // Verify todo is visible
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
    
    // Delete the todo
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);
    
    // Verify todo is not in list
    expect(screen.queryByText('テストタスク')).not.toBeInTheDocument();
    
    // Click undo
    const undoButton = screen.getByText('取り消し');
    fireEvent.click(undoButton);
    
    // Verify todo is restored
    expect(screen.getByText('テストタスク')).toBeInTheDocument();
    expect(screen.queryByText('「テストタスク」を削除しました')).not.toBeInTheDocument();
  });

  it('複数のTodoを削除した場合、最後に削除されたTodoの通知のみ表示される', () => {
    render(<TodoApp />);
    
    // Add two todos
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    fireEvent.change(input, { target: { value: 'タスク1' } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: 'タスク2' } });
    fireEvent.click(addButton);
    
    // Delete first todo (which is タスク2 due to prepending)
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[0]);
    
    // Verify first notification
    expect(screen.getByText('「タスク2」を削除しました')).toBeInTheDocument();
    
    // Delete second todo (which is タスク1)
    fireEvent.click(deleteButtons[1]);
    
    // Verify only the latest notification is shown
    expect(screen.queryByText('「タスク2」を削除しました')).not.toBeInTheDocument();
    expect(screen.getByText('「タスク1」を削除しました')).toBeInTheDocument();
  });

  it('復元されたTodoは元の場所（リストの先頭）に配置される', () => {
    render(<TodoApp />);
    
    // Add multiple todos
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    ['タスク1', 'タスク2', 'タスク3'].forEach(taskText => {
      fireEvent.change(input, { target: { value: taskText } });
      fireEvent.click(addButton);
    });
    
    // Verify order (newest first due to prepending)
    const todoTexts = screen.getAllByText(/タスク[123]/);
    expect(todoTexts[0]).toHaveTextContent('タスク3');
    expect(todoTexts[1]).toHaveTextContent('タスク2');
    expect(todoTexts[2]).toHaveTextContent('タスク1');
    
    // Delete middle todo (タスク2)
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[1]);
    
    // Verify タスク2 is gone
    expect(screen.queryByText('タスク2')).not.toBeInTheDocument();
    
    // Restore it
    const undoButton = screen.getByText('取り消し');
    fireEvent.click(undoButton);
    
    // Verify タスク2 is restored at the top
    const restoredTodoTexts = screen.getAllByText(/タスク[123]/);
    expect(restoredTodoTexts[0]).toHaveTextContent('タスク2'); // restored item at top
    expect(restoredTodoTexts[1]).toHaveTextContent('タスク3');
    expect(restoredTodoTexts[2]).toHaveTextContent('タスク1');
  });

  it('削除通知が表示されていない時は取り消しボタンも表示されない', () => {
    render(<TodoApp />);
    
    // Initially no notification should be visible
    expect(screen.queryByText('取り消し')).not.toBeInTheDocument();
    
    // Add and delete a todo
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    fireEvent.change(input, { target: { value: 'テストタスク' } });
    fireEvent.click(addButton);
    
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);
    
    // Now notification should be visible
    expect(screen.getByText('取り消し')).toBeInTheDocument();
    
    // Click undo
    const undoButton = screen.getByText('取り消し');
    fireEvent.click(undoButton);
    
    // Notification should be gone
    expect(screen.queryByText('取り消し')).not.toBeInTheDocument();
  });
});