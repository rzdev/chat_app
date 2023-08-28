/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['inter', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        "chatapp-green": "#5DB075",
        "chatapp-gray1": "#F6F6F6",
        "chatapp-gray2": "#E8E8E8",
        "chatapp-gray3": "#BDBDBD",
        "figma-gray": "#E5E5E5",
      },
    },
  },
  plugins: [],
};
