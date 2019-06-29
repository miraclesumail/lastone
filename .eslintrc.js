module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars': [2, {
			vars: "all",
			args: "none"
		}]
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	globals: {
		Tool: true,
		net: true,
		popup: true,
		sender: true,
		CreatedPostMessage: true,
		Highcharts: true,
		ws: true
	},
}

this.percent = (res.data.stats.downLinePlayerValid/(res.data.stats.downLinePlayerCount + res.data.stats.downLinePartnerPlayerCount)*100).toFixed(2);

