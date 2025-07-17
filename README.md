# TIL - Today I Learned Blog

> A modern React-based blog for documenting daily learnings and discoveries

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-green)](https://ramiboss.github.io/TIL)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-yellow)](https://vitejs.dev/)

## 🌐 Live Demo

Visit the live site: **[https://ramiboss.github.io/TIL](https://ramiboss.github.io/TIL)**

## ✨ Features

- **🚀 Fast & Modern**: Built with React 18, TypeScript, and Vite
- **📱 Responsive Design**: Works perfectly on all devices
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔍 Search**: Quickly find TILs with real-time search
- **🏷️ Categories & Tags**: Organize content by topic and technology
- **📝 Markdown Support**: Write TILs in markdown with syntax highlighting
- **⚡ Fast Loading**: Optimized static site generation
- **🎨 Beautiful UI**: Clean, modern interface inspired by best practices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7.x
- **Routing**: React Router DOM
- **Styling**: Custom CSS with utility classes
- **Markdown**: React Markdown with syntax highlighting
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: GitHub Pages with GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ramiboss/TIL.git
cd TIL/package

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── SearchModal.tsx # Search functionality
│   └── TILCard.tsx     # TIL post cards
├── pages/              # Page components
│   ├── HomePage.tsx    # Main TIL listing
│   ├── TILDetailPage.tsx # Individual TIL post
│   ├── CategoriesPage.tsx # Category browser
│   ├── AboutPage.tsx   # About page
│   └── NotFoundPage.tsx # 404 page
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark mode context
├── hooks/              # Custom React hooks
│   └── useTheme.ts     # Theme toggle hook
├── types/              # TypeScript type definitions
│   └── index.ts        # Main types
├── utils/              # Utility functions
│   ├── posts.ts        # Post data management
│   └── dates.ts        # Date formatting
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 📝 Adding New TILs

TILs are stored as TypeScript objects in `src/utils/posts.ts`. To add a new TIL:

1. Add your TIL object to the `mockPosts` array:

```typescript
{
  slug: 'your-til-slug',
  title: 'Your TIL Title',
  date: '2025-01-16',
  category: 'Category Name',
  tags: ['tag1', 'tag2'],
  description: 'Brief description of what you learned',
  content: `# Your TIL Title

Your markdown content here...`,
  readingTime: 3
}
```

2. The content should be written in Markdown format
3. Use descriptive titles and relevant tags
4. Keep descriptions concise but informative

## 🎨 Customization

### Themes

The app supports light and dark modes. Theme preferences are saved to localStorage and respect system preferences by default.

### Styling

Custom CSS utility classes are used throughout the project, inspired by Tailwind CSS but implemented as regular CSS for better performance.

### Categories

Categories are automatically generated from your TIL posts. Add new categories by using them in your TIL posts.

## 🚀 Deployment

The project is automatically deployed to GitHub Pages using GitHub Actions when you push to the main branch.

### Manual Deployment

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

### GitHub Actions

The deployment workflow is configured in `.github/workflows/deploy.yml` and will:

1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- The open source community for inspiration and tools

---

**Happy Learning! 🚀**

> The best way to learn is to teach. The best way to teach is to share what you learn.

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
