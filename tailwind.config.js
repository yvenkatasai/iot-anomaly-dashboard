/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f19",
        card: "#111827",
        accent: "#3b82f6",
        danger: "#ef4444",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};
<div className="bg-white/5 backdrop-blur-xl border border-white/10
                rounded-2xl p-5 shadow-lg
                hover:shadow-blue-500/20 hover:-translate-y-1
                transition-all duration-300"></div>