/**
 * Konwertuje tekst na slug przyjazny dla URL
 * Obsługuje polskie znaki diakrytyczne
 */
export const generateSlug = (text: string): string => {
  const polishMap: Record<string, string> = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n',
    'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n',
    'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };

  return text
    .split('')
    .map(char => polishMap[char] || char) // zamień polskie znaki
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // usuń znaki specjalne
    .replace(/[\s_-]+/g, '-') // zamień spacje i _ na -
    .replace(/^-+|-+$/g, '') // usuń - z początku i końca
    .substring(0, 60); // ogranicz długość
};
