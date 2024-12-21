const plugin = require("tailwindcss/plugin");


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-dark": "#0B545D",
        "teal-light": "#4c9b97",
      },
      backgroundImage: {
        "gradient-teal": "linear-gradient(45deg, #0B545D, #4c9b97)",
      },
      maskImage: {
        diagonal:
          "linear-gradient(45deg, #000 25%, rgba(0,0,0,.2) 50%, #000 75%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".mask-diagonal": {
          "-webkit-mask-image":
            "linear-gradient(45deg, #000 25%, rgba(0,0,0,.2) 50%, #000 75%)",
          "mask-image":
            "linear-gradient(45deg, #000 25%, rgba(0,0,0,.2) 50%, #000 75%)",
          "-webkit-mask-size": "800%",
          "mask-size": "800%",
          "-webkit-mask-position": "0",
          "mask-position": "0",
        },
        ".hover-mask-diagonal": {
          transition: "mask-position 2s ease, -webkit-mask-position 2s ease",
          "-webkit-mask-position": "120%",
          "mask-position": "120%",
        },
      });
    }),
  ],
};
