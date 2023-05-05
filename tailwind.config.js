/** @type {import('tailwindcss').Config} */
export default {
  content: ['./dist/**/*.html', './public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "very-light-pink": "#7B7B7B",
        "input-field": "#F7F7F7",
        "hospital-green": "#ACD9B2",
      }
    },
  },
  plugins: [],
}

