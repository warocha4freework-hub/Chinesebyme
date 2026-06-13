/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System custom property mappings
        brand: {
          primary: 'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          accent: 'var(--color-brand-accent)',
        },
        button: {
          primary: {
            DEFAULT: 'var(--color-button-primary-default)',
            hover: 'var(--color-button-primary-hover)',
            disabled: 'var(--color-button-primary-disabled)',
          }
        },
        text: {
          base: 'var(--color-text-base)',
          helper: 'var(--color-text-helper)',
          placeholder: 'var(--color-text-placeholder)',
        },
        status: {
          success: 'var(--color-status-success)',
          warning: 'var(--color-status-warning)',
          info: 'var(--color-status-info)',
          error: 'var(--color-status-error)',
        },
        // Maintain existing mappings pointing to the design values for safety
        navy: {
          950: '#081d36',
          900: 'var(--color-button-primary-hover)',   // Midnight: #0D2E55
          800: 'var(--color-brand-primary)',          // Ocean: #1B4F8A
          700: '#2661a3',
          100: '#edf4fc',
        },
        gold: {
          600: '#e5a51c',
          500: 'var(--color-brand-secondary)',        // Mango: #FFC235
          100: '#fff8e6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
