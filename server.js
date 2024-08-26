const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Remplacez 'db.json' par le nom de votre fichier JSON contenant les données.
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router); // Vous pouvez personnaliser le chemin ici

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
