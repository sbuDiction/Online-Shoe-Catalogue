import assert from 'assert';
import Search_shoes from '../services/search-shoes';
import pg from "pg";

const Pool = pg.Pool

let useSSL = false
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true
}
const connectionString = process.env.DATABASE_URL || "postgresql://diction:19970823@localhost:5432/shoe_catalogue_tests";

const pool = new Pool({ connectionString })

describe("Search all shoes Test", function () {
    beforeEach(async function () {
        //delete before execution
    });

    it("should be able to show all the shoes in the database when search all is executed ", async function () {
        let search_all = Search_shoes(pool);

        let all_shoes = await search_all.all();
        assert.equal(all_shoes.length, 4);
    });

    describe("Search by size Test", function () {
        it("should be able to show only shoes that are from the size that was selected if size 7 was selected ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.by_size(7);
            assert.equal(all_shoes.length, 1);
        });

        it("should be able to show only shoes that are from the size that was selected if size 8 was selected ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.by_size(8);
            assert.equal(all_shoes.length, 1);
        });
    });

    describe("Search by brand Test", function () {
        it("should be able to show only shoes that are from Vans ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.by_brand('Vans');
            assert.equal(all_shoes.length, 1);
        });

        it("should be able to show only shoes that are from Puma ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.by_brand('Puma');
            assert.equal(all_shoes.length, 1);
        });
    });

    describe("Search by brand and size Test", function () {
        it("should be able to show only shoes that are from Vans and size 6 ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.brand_and_size('Vans', 6);
            assert.equal(all_shoes.length, 1);
        });

        it("should be able to show only shoes that are from Converse and size 8 ", async function () {
            let search_all = Search_shoes(pool);

            let all_shoes = await search_all.brand_and_size('Converse', 8);
            assert.equal(all_shoes.length, 1);
        });
    });
    after(function () {
        pool.end();
    });
});

