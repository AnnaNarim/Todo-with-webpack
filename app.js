const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const routes = require('./routes/todo.js');
const Pack = require('./package.json');

const swaggerOptions = {
  info: {
    title: Pack.name,
    version: Pack.version,
  },
  documentationPath: '/swagger',
  jsonEditor: true,
  schemes: ['http', 'https'],
};

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.route(routes);
  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

init();
