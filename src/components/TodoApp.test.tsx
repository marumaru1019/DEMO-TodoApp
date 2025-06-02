import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { TodoApp } from './TodoApp';

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'mock-uuid'),
  },
});

describe('TodoApp - Restoration Feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
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

  it('10秒後に取り消し通知が自動的に消える', async () => {
    render(<TodoApp />);
    
    // Add a todo
    const input = screen.getByPlaceholderText('新しいタスクを入力してください...');
    const addButton = screen.getByText('追加');
    
    fireEvent.change(input, { target: { value: 'テストタスク' } });
    fireEvent.click(addButton);
    
    // Delete the todo
    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);
    
    // Verify notification is visible
    expect(screen.getByText('「テストタスク」を削除しました')).toBeInTheDocument();
    
    // Fast-forward 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    // Wait for state update
    await waitFor(() => {
      expect(screen.queryByText('「テストタスク」を削除しました')).not.toBeInTheDocument();
    });
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
    
    // Delete first todo
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[0]);
    
    // Verify first notification
    expect(screen.getByText('「タスク2」を削除しました')).toBeInTheDocument();
    
    // Delete second todo
    fireEvent.click(deleteButtons[1]);
    
    // Verify only the latest notification is shown
    expect(screen.queryByText('「タスク2」を削除しました')).not.toBeInTheDocument();
    expect(screen.getByText('「タスク1」を削除しました')).toBeInTheDocument();
  });
});