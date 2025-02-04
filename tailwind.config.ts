const config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'font-sans': ['Nunito', 'sans-serif'],
			},
			colors: {
				bodyBg: '#e9e9e9',
				white: '#fcfcfc',
				whitesmoke: '#f6f6f6',
				darkgray: '#a8a8a8',
				success: '#2e3452',
				blue: '#b5d7f7',
				danger: '#fe767f',
				disabled: '#f5f5f5',
				unresolved: '#f3f3f3'
			},
			animation: {
				fade: 'fadeInOut 5s ease-in-out forwards'
			},
			keyframes: {
				spin: {
					'0%': { transform: 'scale(0)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '0' },
				},
				animloader: {
					'0%': {
						transform: 'scale(0)',
						opacity: '1',
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '0',
					},
				},
				animation: {
					spin: 'spin 2s linear infinite',
					animloader: 'animloader 2s linear infinite',
				},
				fadeInOut: {
					'0%': {
						opacity: '0',
					},
					'50%': {
						opacity: '1',
					},
					'100%': {
						opacity: '0',
					}
				}
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.text-custom': {
					fontSize: '1rem',
					fontWeight: '700',
					color: '#2e3452', // success color
					margin: '0',
					cursor: 'default',
					userSelect: 'none',
				},
				'.message': {
					position: 'absolute',
					right: '20px',
					bottom: '20px',
				},
			};

			addUtilities(newUtilities, ['responsive', 'hover']);
		},
	],
};

export default config;