export function getImageUrl(image: string): string {
  if (!image) return 'https://via.placeholder.com/80?text=No+Image';
  if (image.startsWith('http') || image.startsWith('data:') || image.startsWith('blob:')) return image;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  return `${apiBaseUrl}${image}`;
} 