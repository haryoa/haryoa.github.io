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
      typography: (theme) => ({
        slate: {
          css: {
            '--tw-prose-links': '#3498db',
            'a': {
              color: '#3498db',
              'text-decoration': 'none',
              'transition': 'color 0.2s ease',
              '&:hover': {
                color: '#2980b9',
                'text-decoration': 'underline',
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
