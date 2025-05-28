# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js project built with TypeScript and Tailwind CSS. The project uses the App Router architecture and includes ESLint for code quality.

## Technologies Used
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint
- **Package Manager**: npm

## Development Guidelines
1. Use TypeScript for all new components and utilities
2. Follow Next.js App Router conventions for routing and layouts
3. Use Tailwind CSS for styling - prefer utility classes over custom CSS
4. Ensure all components are properly typed
5. Follow React best practices and use modern React patterns
6. Use server components by default, add 'use client' only when necessary
7. Optimize for performance and SEO

## Code Style
- Use functional components with hooks
- Prefer arrow functions for component definitions
- Use meaningful variable and function names
- Add proper JSDoc comments for complex functions
- Keep components small and focused on a single responsibility

## File Organization
- Components in `src/components/`
- Pages using App Router in `src/app/`
- Utilities in `src/lib/` or `src/utils/`
- Types in `src/types/` or co-located with components
- Static assets in `public/`
