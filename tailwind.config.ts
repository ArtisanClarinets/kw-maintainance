import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(222, 47%, 11%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        secondary: {
          DEFAULT: "hsl(210, 40%, 96.1%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        accent: {
          DEFAULT: "hsl(193, 94%, 69%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        success: {
          DEFAULT: "hsl(143, 72%, 40%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        warning: {
          DEFAULT: "hsl(43, 98%, 54%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        info: {
          DEFAULT: "hsl(217, 91%, 60%)",
          foreground: "hsl(222, 47%, 11%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "Cambria", "Times New Roman"],
      },
      spacing: {
        '0': '0rem',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #0a192f, #1e293b)',
        'gradient-accent': 'linear-gradient(to right, #3b82f6, #1d4ed8)',
        'gradient-light': 'linear-gradient(to right, #f7fafc, #e2e8f0)',
        'gradient-dark': 'linear-gradient(to right, #0a192f, #1e293b)',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      lineHeight: {
        'body': '1.5',
        'heading': '1.2',
        'caption': '1.4',
      },
      letterSpacing: {
        'body': '0',
        'heading': '-0.02em',
        'uppercase': '0.05em',
        'large-heading': '-0.03em',
      },
    },
  },
  plugins: [],
};

export default config;