/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coffee Bean Color Spectrum (from raw green to rich crema & dark espresso)
        bean: {
          parchment: "#F9F6F0", // Warm bean parchment / light paper bg
          crema: "#F3ECE1",     // Froth / crema surface
          subtle: "#E7DCcb",    // Soft border & divider
          border: "#D6C7B2",    // Hairline craft border
          espresso: "#1A0F0A",  // Deepest dark roast text & elements
          roast: "#2C1A11",     // Dark rich coffee bean body
          muted: "#78685C",     // Coffee husk & chaff muted text
          crack: "#C45525",     // First crack terracotta accent
          "crack-hover": "#A64218",
          green: "#5B6C50",     // Raw green specialty coffee bean
          chaff: "#D9A865",     // Golden roasted silverskin / chaff
          caramel: "#8C4F2B",   // Maillard reaction warm brown
          honey: "#B57D3E",     // Honey process / golden bean

          // Dark Theme Palette Tokens (Velvet Dark Roast)
          "dark-bg": "#120A06",      // Deepest dark roast espresso
          "dark-surface": "#1B100B", // Roaster drum dark surface
          "dark-card": "#24160E",    // Dark bean card
          "dark-border": "#3D2619",  // Deep coffee border
          "dark-text": "#F5EBE1",    // Warm crema text
          "dark-muted": "#A38F7F",   // Muted chaff text
          "dark-accent": "#E06A3B",  // Glowing terracotta crack
        },
        // Backwards compatibility with craft tokens
        craft: {
          bg: "#F9F6F0",
          surface: "#F3ECE1",
          subtle: "#E7DCcb",
          border: "#D6C7B2",
          dark: "#1A0F0A",
          muted: "#78685C",
          accent: "#C45525",
          "accent-hover": "#A64218",
          olive: "#5B6C50",
          sand: "#D9A865",
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
        bean: "12px 4px 14px 4px",
      },
      boxShadow: {
        craft: "2px 2px 0px 0px #1A0F0A",
        "craft-dark": "2px 2px 0px 0px #F5EBE1",
        "craft-sm": "1px 1px 0px 0px #1A0F0A",
        "craft-sm-dark": "1px 1px 0px 0px #F5EBE1",
        "bean-glow": "0 0 25px -5px rgba(196, 85, 37, 0.45)",
      },
      letterSpacing: {
        editorial: "-0.03em",
        spacious: "0.15em",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
