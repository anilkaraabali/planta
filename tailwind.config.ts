import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: {
              50: '#f3f9f3',
              100: '#dceedd',
              200: '#baddba',
              300: '#8bc18b',
              400: '#5ea15e',
              500: '#3e813e',
              600: '#306630',
              700: '#285528',
              800: '#1f431f',
              900: '#152f15',
              DEFAULT: '#224722',
              foreground: '#fff',
            },
            secondary: {
              50: '#fff9e7',
              100: '#fff2cc',
              200: '#ffe89a',
              300: '#fddb69',
              400: '#f9cf5d',
              500: '#e6b847',
              600: '#c39a32',
              700: '#a18128',
              800: '#81671e',
              900: '#5f4d15',
              DEFAULT: '#f9cf5d',
              foreground: '#224722',
            },
          },
        },
        light: {
          colors: {
            primary: {
              50: '#f3f9f3',
              100: '#dceedd',
              200: '#baddba',
              300: '#8bc18b',
              400: '#5ea15e',
              500: '#3e813e',
              600: '#306630',
              700: '#285528',
              800: '#1f431f',
              900: '#152f15',
              DEFAULT: '#224722',
              foreground: '#fff',
            },
            secondary: {
              50: '#fff9e7',
              100: '#fff2cc',
              200: '#ffe89a',
              300: '#fddb69',
              400: '#f9cf5d',
              500: '#e6b847',
              600: '#c39a32',
              700: '#a18128',
              800: '#81671e',
              900: '#5f4d15',
              DEFAULT: '#f9cf5d',
              foreground: '#224722',
            },
          },
        },
      },
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
};

export default config;
