/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#F59E0B',
        success: '#16A34A',
        danger: '#DC2626',
        background: '#F8FAFC',
        card: '#FFFFFF',
        muted: '#6B7280'
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 23, 42, 0.08)'
      },
      borderRadius: {
        card: '8px'
      }
    }
  },
  plugins: []
};
