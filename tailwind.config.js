/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { kfPurple: "#6C2BD9", kfPink: "#E0217E", kfOrange: "#F7931E", kfGold: "#D4AF37" },
      backgroundImage: { "kf-gradient": "linear-gradient(135deg, #6C2BD9 0%, #E0217E 50%, #F7931E 100%)" },
    },
  },
  plugins: [],
};
