require('@testing-library/jest-dom');

// Mock Next.js components
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return React.createElement('a', { href, ...props }, children);
  };
});

jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    return React.createElement('img', { src, alt, ...props });
  };
});