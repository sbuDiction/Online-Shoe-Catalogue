import express from 'express';
import pg from 'pg';
import Seearch_engine from '../services/search_engine';
import search_api from '../api/shoes_api'
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
const axios = require('axios').default;

const app = express();

const handlebarSetup = handlebars({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});

app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Pool } = pg;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || "postgresql://diction:19970823@localhost:5432/shoe_catalogue";

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const engine = Seearch_engine(pool);
const api = search_api(engine)

app.use(express.static('client'))
const PORT = process.env.PORT || 3000;

//api routes
app.get('/api/shoes', api.all)
app.get('/api/dropdown/color', api.color_dropdown);
app.get('/api/dropdown/brand', api.brand_dropdown);
app.get('/api/dropdown/size', api.size_dropdown);
app.get('/api/shoes/brand/:brandname', api.brand)
app.get('/api/shoes/size/:size', api.size)
app.get('/api/shoes/brand/:brandname/size/:size', api.brand_and_size);
app.post('/api/shoes/cart/:id', api.cart)
// app.post('/api/shoes/', api.update)
app.post('/api/add/shoe/', api.update);

app.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`)
});