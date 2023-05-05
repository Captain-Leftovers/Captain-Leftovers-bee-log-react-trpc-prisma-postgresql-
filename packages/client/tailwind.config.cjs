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
			backgroundImage: {
		// 		lavender: "url('src/assets/bee.png')",
        // beeField: "url('src/assets/field.png')",
        // beeLg: "url('src/assets/beeLg.png')",
        // flower1: "url('src/assets/flowersMb.png')",
        // flower2: "url('src/assets/flowers2Mb.png')",
			},
		
		}, 
		
	},
	// variants: {
	// 	extend: {
	// 		backgroundColor: [],
	// 	},
	// },
	plugins: [],
}

// ///* CSS HEX */
// --charcoal: #264653ff;
// --persian-green: #2a9d8fff;
// --saffron: #e9c46aff;
// --sandy-brown: #f4a261ff;
// --burnt-sienna: #e76f51ff;

// /* CSS HSL */
// --charcoal: hsla(197, 37%, 24%, 1);
// --persian-green: hsla(173, 58%, 39%, 1);
// --saffron: hsla(43, 74%, 66%, 1);
// --sandy-brown: hsla(27, 87%, 67%, 1);
// --burnt-sienna: hsla(12, 76%, 61%, 1);

// /* SCSS HEX */
// $charcoal: #264653ff;
// $persian-green: #2a9d8fff;
// $saffron: #e9c46aff;
// $sandy-brown: #f4a261ff;
// $burnt-sienna: #e76f51ff;

// /* SCSS HSL */
// $charcoal: hsla(197, 37%, 24%, 1);
// $persian-green: hsla(173, 58%, 39%, 1);
// $saffron: hsla(43, 74%, 66%, 1);
// $sandy-brown: hsla(27, 87%, 67%, 1);
// $burnt-sienna: hsla(12, 76%, 61%, 1);

// /* SCSS RGB */
// $charcoal: rgba(38, 70, 83, 1);
// $persian-green: rgba(42, 157, 143, 1);
// $saffron: rgba(233, 196, 106, 1);
// $sandy-brown: rgba(244, 162, 97, 1);
// $burnt-sienna: rgba(231, 111, 81, 1);

// /* SCSS Gradient */
// $gradient-top: linear-gradient(0deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-right: linear-gradient(90deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-bottom: linear-gradient(180deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-left: linear-gradient(270deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-top-right: linear-gradient(45deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-bottom-right: linear-gradient(135deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-top-left: linear-gradient(225deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-bottom-left: linear-gradient(315deg, #264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
// $gradient-radial: radial-gradient(#264653ff, #2a9d8fff, #e9c46aff, #f4a261ff, #e76f51ff);
