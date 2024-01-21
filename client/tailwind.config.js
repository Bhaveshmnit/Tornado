/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [];

export const my=  {
  theme: {
    boxShadow: {
      customshadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    }
  }
};