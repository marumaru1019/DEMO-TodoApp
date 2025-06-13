import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('アプリロゴとタイトルが表示される', () => {
    render(<Header />);
    expect(screen.getByAltText('App Logo')).toBeInTheDocument();
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('デスクトップナビゲーションリンクが表示される', () => {
    render(<Header />);
    const homeLinks = screen.getAllByText('ホーム');
    const aboutLinks = screen.getAllByText('About');
    
    // デスクトップ版のリンクが存在することを確認
    expect(homeLinks.length).toBeGreaterThan(0);
    expect(aboutLinks.length).toBeGreaterThan(0);
  });

  it('モバイルメニューボタンが表示される', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /メインメニューを開く/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('モバイルメニューボタンをクリックするとメニューが表示される', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /メインメニューを開く/i });
    
    // 初期状態ではモバイルメニューは非表示
    const mobileNav = screen.getByRole('navigation').parentElement?.querySelector('.md\\:hidden');
    expect(mobileNav).toHaveClass('hidden');
    
    // メニューボタンをクリック
    fireEvent.click(menuButton);
    
    // メニューが表示される
    expect(mobileNav).toHaveClass('block');
  });

  it('モバイルメニューのリンクをクリックするとメニューが閉じる', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button', { name: /メインメニューを開く/i });
    
    // メニューを開く
    fireEvent.click(menuButton);
    
    const mobileNav = screen.getByRole('navigation').parentElement?.querySelector('.md\\:hidden');
    expect(mobileNav).toHaveClass('block');
    
    // モバイルメニューのホームリンクをクリック（複数あるので最後のものを選択）
    const homeLinks = screen.getAllByText('ホーム');
    const mobileHomeLink = homeLinks[homeLinks.length - 1];
    fireEvent.click(mobileHomeLink);
    
    // メニューが閉じる
    expect(mobileNav).toHaveClass('hidden');
  });

  it('ロゴをクリックするとホームページにナビゲートする', () => {
    render(<Header />);
    const logoLink = screen.getByText('Todo App').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('ナビゲーションリンクが正しいhrefを持つ', () => {
    render(<Header />);
    
    // ホームリンクのhrefをチェック（最初のもの = デスクトップ版）
    const homeLinks = screen.getAllByText('ホーム');
    const desktopHomeLink = homeLinks[0].closest('a');
    expect(desktopHomeLink).toHaveAttribute('href', '/');
    
    // Aboutリンクのhrefをチェック（最初のもの = デスクトップ版）
    const aboutLinks = screen.getAllByText('About');
    const desktopAboutLink = aboutLinks[0].closest('a');
    expect(desktopAboutLink).toHaveAttribute('href', '/about');
  });
});