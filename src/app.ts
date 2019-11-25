import express from 'express';
import pg from 'pg';
import Seearch_engine from '../services/search_engine';
import Routes from '../routes/index';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';

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

const engine = new Seearch_engine(pool);
engine.display_brand()
// const routing = new Routes(engine);


app.use(express.static('client'))

const PORT = process.env.PORT || 3000;


app.get('/', async function (req: any, res: any) {
    const brand = await engine.display_brand();
    const colors = await engine.display_color();
    const sizes = await engine.display_size()
    const results = await engine.display_shoes()

    // const color = req.params.color
    console.log(results, 'yes');

    // const results = await engine.brand_and_size()
    res.render('index', { brands: brand, colors: colors, size: sizes, results: results })
})

app.post('/stock', async function (req: any, res: any) {
    // console.log(req.body);
    const color: string = req.body.color;
    const brands: string = req.body.brand;
    const size: number = Number(req.body.size);
    console.log(req.body, 'this');

    await engine.brand_and_size(brands, size)
    res.redirect('/')
})

app.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`)
});