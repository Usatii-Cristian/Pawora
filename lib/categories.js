import { CATEGORIES } from './mockData';

export function getCategoryLabel(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.name || slug;
}
