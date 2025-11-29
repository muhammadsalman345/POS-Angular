export interface ThemeConfig {
  name: string;
  properties: { [key: string]: string };
}

export const lightTheme: ThemeConfig = {
  name: 'light',
  properties: {
    '--primary-color': '#1976d2',
    '--secondary-color': '#dc004e',
    '--background-color': '#ffffff',
    '--surface-color': '#f8f9fa',
    '--text-primary': '#212529',
    '--text-secondary': '#6c757d',
    '--border-color': '#dee2e6',
    '--success-color': '#28a745',
    '--warning-color': '#ffc107',
    '--error-color': '#dc3545'
  }
};

export const darkTheme: ThemeConfig = {
  name: 'dark',
  properties: {
    '--primary-color': '#90caf9',
    '--secondary-color': '#f48fb1',
    '--background-color': '#121212',
    '--surface-color': '#1e1e1e',
    '--text-primary': '#ffffff',
    '--text-secondary': '#b0b0b0',
    '--border-color': '#333333',
    '--success-color': '#81c784',
    '--warning-color': '#ffb74d',
    '--error-color': '#e57373'
  }
};