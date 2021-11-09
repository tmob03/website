const swaggerAutogen = require('swagger-autogen')();
const path = require('path');
const config = require('./config')

const doc = {
	info: {
		version: '',      // by default: '1.0.0'
		title: '',        // by default: 'REST API'
		description: '',  // by default: ''
	},
	host: 'https://api.momentum-mod.org',      // by default: 'localhost:3000'
	basePath: '/',  // by default: '/'
	schemes: ['https'],   // by default: ['http']
	consumes: [],  // by default: ['application/json']
	produces: [],  // by default: ['application/json']
	tags: [        // by default: empty Array
		{
			name: 'Auth',         // Tag name
			description: 'API for authenticating with the system',  // Tag description
		},
		{
			name: 'User',
			description: 'API for authenticating wi'
		}
		// { ... }
	],
	securityDefinitions: {},  // by default: empty object (Swagger 2.0)
	definitions: {},          // by default: empty object
	components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = path.join(__dirname, 'swagger_output.json');
const routesPath = path.join(__dirname, '..', 'src', 'routes');
const endpointsFiles = [
	routesPath + "/api/404.js",
	routesPath + "/api/activities.js",
	routesPath + "/api/admin.js",
	routesPath + "/api/index.js",
	routesPath + "/api/maps.js",
	routesPath + "/api/reports.js",
	routesPath + "/api/runs.js",
	routesPath + "/api/stats.js",
	routesPath + "/api/user.js",
	routesPath + "/api/users.js",
	routesPath + "/auth/index.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc).then( () => {
	require('../server')
});
