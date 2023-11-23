/** @type {import('tailwindcss').Config} */
module.exports = {
  resolve:{
    fallback: {"http": require.resolve("stream-http")}
},
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}