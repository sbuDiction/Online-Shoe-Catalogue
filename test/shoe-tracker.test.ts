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
        assert.equal(all_shoes.length, 3);
    });

    after(function () {
        pool.end();
    });
});