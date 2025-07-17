<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# TIL (Today I Learned) React Project Instructions

This is a React + TypeScript + Vite project for a TIL (Today I Learned) blog. The project includes:

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- React Markdown for rendering markdown content
- Gray Matter for parsing frontmatter
- Lucide React for icons
- CSS3 with modern features

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `public/posts/` - Markdown files for TIL posts
- `src/data/` - Static data and post metadata

## Coding Standards

- Use TypeScript for all new files
- Follow React functional components with hooks
- Use CSS modules or styled components for styling
- Implement responsive design principles
- Follow accessibility best practices
- Use semantic HTML elements
- Implement proper error handling

## TIL Post Format

TIL posts should be markdown files with frontmatter containing:

- title: string
- date: YYYY-MM-DD
- category: string
- tags: string[]
- description: string

## Features to Implement

- Homepage with TIL listing
- Category filtering
- Search functionality
- Individual TIL post pages
- Responsive navigation
- Dark/light theme toggle
- GitHub Pages deployment
