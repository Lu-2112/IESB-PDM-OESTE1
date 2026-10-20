export const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Outros'];

export const themes = {
  light: {
    background: '#FFF0F6',
    card: '#FFFFFF',
    text: '#3B0A24',
    textSecondary: '#9D5C7A',
    border: '#F9C5DA',
    primary: '#EC4899',
    error: '#DC2626',
    input: '#FFFFFF',
  },
  dark: {
    background: '#1A0F15',
    card: '#2A1721',
    text: '#FCE7F3',
    textSecondary: '#D9A0BC',
    border: '#5B2E45',
    primary: '#F472B6',
    error: '#F87171',
    input: '#331D29',
  },
};

export const getTheme = (scheme) => (scheme === 'dark' ? themes.dark : themes.light);