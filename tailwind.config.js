export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './src/**/*.{scss,css}',
  ],
  theme: {
    extend: {
      colors: {
        'cor-primaria': '#a52830',
        'cor-primaria-light': '#ed3237',
        'cor-fundo': '#F5F5F5',
        'cor-texto': '#323232',
        'cor-complementar': '#B48E4D',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
 
};
