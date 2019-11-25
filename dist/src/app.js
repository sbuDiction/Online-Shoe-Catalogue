"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = __importDefault(require("pg"));
const search_engine_1 = __importDefault(require("../services/search_engine"));
const index_1 = __importDefault(require("../routes/index"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const handlebarSetup = express_handlebars_1.default({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});
app.engine("handlebars", handlebarSetup);
app.set("view engine", "handlebars");
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
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
const search = new search_engine_1.default(pool);
const routing = new index_1.default(search);
app.use(express_1.default.static('client'));
const PORT = process.env.PORT || 3000;
app.get('/', routing.index);
app.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`);
});
//# sourceMappingURL=app.js.map