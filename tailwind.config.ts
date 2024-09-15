import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
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
    			primary: {
    				DEFAULT: 'var(--primary)',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'var(--secondary)',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			accent: {
    				DEFAULT: 'var(--accent)',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			card: {
    				DEFAULT: 'var(--card)',
    				foreground: 'var(--card-foreground)'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			transparent: 'transparent',
    			info: 'var(--color-info)',
    			success: 'var(--color-success)',
    			warning: 'var(--color-warning)',
    			danger: 'var(--color-danger)',
    			background: 'var(--background)',
    			foreground: 'var(--foreground)',
    			foreground_secondary: 'var(--foreground-secondary)',
    			borderRadius: {
    				lg: 'var(--radius)',
    				md: 'calc(var(--radius) - 2px)',
    				sm: 'calc(var(--radius) - 4px)'
    			},
    			keyframes: {
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
    				},
    				'gradient-border': {
    					'0%': {
    						'background-position': '0% 50%'
    					},
    					'50%': {
    						'background-position': '100% 50%'
    					},
    					'100%': {
    						'background-position': '0% 50%'
    					}
    				}
    			},
    			animation: {
    				'accordion-down': 'accordion-down 0.2s ease-out',
    				'accordion-up': 'accordion-up 0.2s ease-out',
    				'gradient-border': 'gradient-border 3s linear infinite'
    			},
    			fontFamily: {
					poppins: {
					  DEFAULT: "Poppins",
					  sans: "sans-serif"
					},
					inter: "Inter, sans-serif"
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
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
    			},
    			'wave-right': {
    				'0%': {
    					'background-position-x': '0px'
    				},
    				'100%': {
    					'background-position-x': '1440px'
    				}
    			},
    			'wave-left': {
    				'0%': {
    					'background-position-x': '1440px'
    				},
    				'100%': {
    					'background-position-x': '0px'
    				}
    			},
    			wave: {
    				'0%': {
    					transform: 'translateY(0)'
    				},
    				'50%': {
    					transform: 'translateY(-20px)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			wave1: 'wave-right 35s linear infinite',
    			wave2: 'wave-left 20s linear infinite',
    			waveUpDown: 'wave 10s linear infinite'
    		},
    		fontFamily: {
    			poppins: ["Poppins", "sans-serif"],
    			inter: ["Inter", "sans-serif"]
    		}
    	}
    },
  safelist: [
	"max-w-72",
	"align-left",
	"align-center",
	"align-right",
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config