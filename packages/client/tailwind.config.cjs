/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
	theme: {
		extend: {
			colors: {
				one: '#264653',
				two: '#2a9d8f',
				three: '#e9c46a',
				four: '#f4a261',
				five: '#e76f51',
				six: '#606C38',
			},
			backgroundImage: {},
			animation: {
				bottomBorder: 'background ease infinite',
			},
			keyframes: {
				bottomBorder: {
					'0%, 100%': {
						backgroundPosition: '0% 50%',
					},
					'50%': {
						backgroundPosition: '100% 50%',
					},
				},
			},
		},
	},

	plugins: [],
}
