'use client';

import { useState } from 'react';
import { Todo, TodoFilter } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import { TodoFilter as TodoFilterComponent } from './TodoFilter';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [recentlyDeleted, setRecentlyDeleted] = useState<Todo[]>([]);
  const [lastDeletedTodo, setLastDeletedTodo] = useState<Todo | null>(null);
  const [deleteTimeoutId, setDeleteTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
      // Clear any existing timeout
      if (deleteTimeoutId) {
        clearTimeout(deleteTimeoutId);
      }
      
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setRecentlyDeleted(prev => [todoToDelete, ...prev]);
      setLastDeletedTodo(todoToDelete);
      
      // Auto-remove from recently deleted after 10 seconds
      const timeoutId = setTimeout(() => {
        setRecentlyDeleted(prev => prev.filter(todo => todo.id !== id));
        setLastDeletedTodo(prev => prev?.id === id ? null : prev);
        setDeleteTimeoutId(null);
      }, 10000);
      
      setDeleteTimeoutId(timeoutId);
    }
  };

  const restoreTodo = (id: string) => {
    const todoToRestore = recentlyDeleted.find(todo => todo.id === id);
    if (todoToRestore) {
      // Clear the auto-delete timeout
      if (deleteTimeoutId) {
        clearTimeout(deleteTimeoutId);
        setDeleteTimeoutId(null);
      }
      
      setRecentlyDeleted(prev => prev.filter(todo => todo.id !== id));
      setTodos(prev => [todoToRestore, ...prev]);
      setLastDeletedTodo(null);
    }
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Todo App
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <TodoInput onAddTodo={addTodo} />
        
        <div className="mt-6">
          <TodoFilterComponent
            currentFilter={filter}
            onFilterChange={setFilter}
            activeTodosCount={activeTodosCount}
            completedTodosCount={completedTodosCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        {lastDeletedTodo && (
          <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg flex items-center justify-between">
            <span className="text-orange-800 dark:text-orange-200">
              「{lastDeletedTodo.text}」を削除しました
            </span>
            <button
              onClick={() => restoreTodo(lastDeletedTodo.id)}
              className="px-3 py-1 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors duration-200"
            >
              取り消し
            </button>
          </div>
        )}

        <div className="mt-6 space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              {filter === 'active' && 'アクティブなタスクはありません'}
              {filter === 'completed' && '完了したタスクはありません'}
              {filter === 'all' && 'タスクがありません。新しいタスクを追加してください。'}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
            {activeTodosCount}個のアクティブなタスク、{completedTodosCount}個の完了済みタスク
          </div>
        )}
      </div>
    </div>
  );
}
