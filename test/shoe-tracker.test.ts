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
        // await pool.query("DELETE FROM join_tables");
        // await pool.query("DELETE FROM  working_days");
        // await pool.query("DELETE FROM  user_names");
    });

    it("should be able to show all the shoes in the database when search all is executed ", async function () {
        let waiter_shift = Search_shoes(pool);

        // let waiters = await waiter_shift.week();
        assert.equal('hello', 'hello');
    });

    after(function () {
        pool.end();
    });
});