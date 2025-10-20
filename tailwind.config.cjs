module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      animation: {
        fadeInScale: 'fadeInScale 1s ease-in-out forwards',
      },

      slide: {
        from: { translate: '0%' },
        to: { translate: '100%' },
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
