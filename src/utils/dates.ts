import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateString: string, formatStr: string = 'MMMM d, yyyy'): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return dateString;
    }
    return format(date, formatStr);
  } catch {
    console.warn('Invalid date format:', dateString);
    return dateString;
  }
};

export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, 'MMM d, yyyy');
};

export const formatDateLong = (dateString: string): string => {
  return formatDate(dateString, 'EEEE, MMMM d, yyyy');
};

export const getRelativeDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) {
      return dateString;
    }

    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;

    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    console.warn('Invalid date format:', dateString);
    return dateString;
  }
};
