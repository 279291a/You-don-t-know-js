module.exports = {
  "extends": "airbnb-base",
  "plugins": [
		"import",
		"jsx-a11y"
	],
	"env": {
		"es6": true,
		"browser": true,
		"node": true,
		"mocha": true,
		"jest": true
	},
	"rules": {
		"global-require":"off"
	}
};