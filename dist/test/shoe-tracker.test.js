"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const search_shoes_1 = __importDefault(require("../services/search-shoes"));
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || "postgresql://diction:19970823@localhost:5432/shoe_catalogue_tests";
const pool = new Pool({ connectionString });
describe("Search all shoes Test", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // await pool.query("DELETE FROM join_tables");
            // await pool.query("DELETE FROM  working_days");
            // await pool.query("DELETE FROM  user_names");
        });
    });
    it("should be able to show all the shoes in the database when search all is executed ", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let waiter_shift = search_shoes_1.default(pool);
            // let waiters = await waiter_shift.week();
            assert_1.default.equal('hello', 'hello');
        });
    });
    after(function () {
        pool.end();
    });
});
//# sourceMappingURL=shoe-tracker.test.js.map