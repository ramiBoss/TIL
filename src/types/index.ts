export interface TILPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
  readingTime?: number;
}

export interface TILFrontMatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

export interface Category {
  name: string;
  count: number;
  posts: TILPost[];
}

export interface SearchFilters {
  query: string;
  category: string;
  tags: string[];
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
