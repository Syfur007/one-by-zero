/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	daisyui: {
		themes: [
			{
				oneByZero: {
					primary: "#5b24ea", //body bg
					secondary: "#1f1d28",
					info: "#190f3b", //headerbg
					success: "#1f1d28", //btnbg
					btnhover: "#202124",
					"base-100": "#FFFFFF",
				},
			},
		],
	},
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
});
