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
const search_engine_1 = __importDefault(require("../services/search_engine"));
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
            //delete before execution
        });
    });
    it("should be able to show all the shoes in the database when search all is executed ", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let search_for_shoe = new search_engine_1.default(pool);
            let all_shoes = yield search_for_shoe.search();
            assert_1.default.equal(all_shoes.length, 4);
        });
    });
    describe("Search by size Test", function () {
        it("should be able to show only shoes that are from the size that was selected if size 7 was selected ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.size(7);
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
        it("should be able to show only shoes that are from the size that was selected if size 8 was selected ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.size(8);
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
    });
    describe("Search by brand Test", function () {
        it("should be able to show only shoes that are from Vans ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.brand('Vans');
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
        it("should be able to show only shoes that are from Puma ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.brand('Puma');
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
    });
    describe("Search by brand and size Test", function () {
        it("should be able to show only shoes that are from Vans and size 6 ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.brand_and_size('Vans', 6);
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
        it("should be able to show only shoes that are from Converse and size 8 ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let search_for_shoe = new search_engine_1.default(pool);
                let all_shoes = yield search_for_shoe.brand_and_size('Converse', 8);
                assert_1.default.equal(all_shoes.length, 1);
            });
        });
    });
    after(function () {
        pool.end();
    });
});
//# sourceMappingURL=shoe-tracker.test.js.map