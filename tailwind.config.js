/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          bg: "#F6F4EE",
          surface: "#EDE8DF",
          subtle: "#E5DFD5",
          border: "#DDD7CD",
          dark: "#1C1917",
          muted: "#78716C",
          accent: "#B84A28", // terracotta / coffee cherry
          "accent-hover": "#9F3D1F",
          olive: "#5F634F",
          sand: "#C4BBAF",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
      },
      boxShadow: {
        craft: "2px 2px 0px 0px #1C1917",
        "craft-sm": "1px 1px 0px 0px #1C1917",
      },
      letterSpacing: {
        editorial: "-0.03em",
        spacious: "0.15em",
      },
    },
  },
  plugins: [],
};
