const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const massive = require("massive");
const products_controller = require("./products_controller");

const app = express();

const { server_port, CONNECTION_STRING } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
.then(dbInstance => {
    app.set('db', dbInstance);
    console.log('Database connected')
})
.catch(() => {
    console.log(error)
});

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/id:', products_controller.getOne);
app.put('/api/products/id:', products_controller.update);
app.delete('/api/products/id:', products_controller.delete);

app.listen(server_port, () => {
    console.log(`Server listening on port ${server_port}`);
});