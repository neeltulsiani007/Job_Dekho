/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      backgroundImage: theme => ({
        'bgimage1': "url('./Components/bg1.jpeg')",
        'bgimage2': "url('./Components/emailbg.jpeg')",
        })
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
