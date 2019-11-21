"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
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
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome Sbu!');
});
app.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map