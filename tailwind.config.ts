import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				"off-white": "#F0EEE6",
				"brown-text": "#3D3929",
				lightBg: "#F5E7D3",
				lightText: "#AC4800",
				lightText80: "rgba(172, 72, 0, 0.8)",
				lightText60: "rgba(172, 72, 0, 0.6)",
				lightText20: "rgba(172, 72, 0, 0.2)",
				darkBg: "#1D1C1C",
				darkText: "#F5E7D3",
				darkText80: "rgba(245, 231, 211, 0.8)",
				darkText60: "rgba(245, 231, 211, 0.6)",
				darkText20: "rgba(245, 231, 211, 0.2)",
				accent: "#323816",
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontSize: {
				'dynamic-h2': 'clamp(2rem, 6vw, 4.375rem)',
				'dynamic-p': 'clamp(1.3rem, 3.5vw, 4.5rem)',
			},
			lineHeight: {
				'dynamic-p': 'clamp(2rem, 4.5vw, 6rem)',
			},
			fontFamily: {
				'spectral': ['SpectralBridgeRegular', 'serif'],
				'boska': ['Boska-Regular', 'serif'],
				'boska-bold': ['Boska-Bold', 'serif'],
				'boska-black': ['Boska-Black', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			"animation": {
				shimmer: "shimmer 2s linear infinite",
				"cloud-in": "cloudIn 2s ease-in-out forwards",
				"cloud-out": "cloudOut 2s ease-in-out forwards",
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			keyframes: {
				shimmer: {
					from: {
						"backgroundPosition": "0 0"
					},
					to: {
						"backgroundPosition": "-200% 0"
					}
				},
				cloudIn: {
					"0%": { transform: "scale(1)", opacity: "0.5" },
					"25%": { transform: "scale(2)", opacity: "0.7" },
					"50%": { transform: "scale(3)", opacity: "0.9" },
					"100%": { transform: "scale(5)", opacity: "1" },
				},
				cloudOut: {
					"0%": { transform: "scale(5)", opacity: "1" },
					"25%": { transform: "scale(3)", opacity: "0.9" },
					"50%": { transform: "scale(2)", opacity: "0.7" },
					"100%": { transform: "scale(1)", opacity: "0" },
				},

				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
