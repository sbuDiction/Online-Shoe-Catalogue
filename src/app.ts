import express from 'express';
import pg from 'pg';
import Seearch_engine from '../services/search_engine';
import Routes from '../routes/index';

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

const search = new Seearch_engine(pool);
const routing = new Routes(search)

const app = express();

app.use(express.static('client'))

const PORT = process.env.PORT || 3000;
app.get('/', (req: any, res: any) => {
    res.send('Welcome Sbu!');
});
app.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`)
});