import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        sage: "#4A5D4F",
        cream: "#F5F1E8",
        copper: "#B87E5F",
        charcoal: "#2C2C2C",
      },
      typography: () => ({
        slate: {
          css: {
            '--tw-prose-links': '#B87E5F',
            'a': {
              color: '#B87E5F',
              'text-decoration': 'none',
              'transition': 'color 0.2s ease',
              '&:hover': {
                color: '#9C6649',
                'text-decoration': 'underline',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};
