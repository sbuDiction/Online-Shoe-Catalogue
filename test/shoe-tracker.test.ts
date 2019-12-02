// import assert from 'assert';
// import Search from "../services/search_engine";
// import pg from "pg";

// const Pool = pg.Pool

// let useSSL = false
// const local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true
// }
// const connectionString = process.env.DATABASE_URL || "postgresql://diction:19970823@localhost:5432/shoe_catalogue_tests";

// const pool = new Pool({ connectionString })

// // describe("Search all shoes Test", function () {
// beforeEach(async function () {
//     //delete before execution
//     // await pool.query("DELETE FROM brands_table");
//     // await pool.query("DELETE FROM colors_table");
//     // await pool.query("DELETE FROM size_table");
// });

// //     it("should be able to show all the shoes in the database when search all is executed ", async function () {
// //         let search_for_shoe = Search(pool);

// //         let all_shoes = await search_for_shoe.search_all();
// //         assert.equal(all_shoes.length, 4);
// //     });

// //     describe("Search by size Test", function () {
// //         it("should be able to show only shoes that are from the size that was selected if size 7 was selected ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.by_size(7);
// //             assert.equal(all_shoes.length, 1);
// //         });

// //         it("should be able to show only shoes that are from the size that was selected if size 8 was selected ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.by_size(8);
// //             assert.equal(all_shoes.length, 1);
// //         });
// //     });

// //     describe("Search by brand Test", function () {
// //         it("should be able to show only shoes that are from Vans ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.by_brand('Vans');
// //             assert.equal(all_shoes.length, 1);
// //         });

// //         it("should be able to show only shoes that are from Puma ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.by_brand('Puma');
// //             assert.equal(all_shoes.length, 1);
// //         });
// //     });

// //     describe("Search by brand and size Test", function () {
// //         it("should be able to show only shoes that are from Vans and size 6 ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.search('Vans', 6);
// //             assert.equal(all_shoes.length, 1);
// //         });

// //         it("should be able to show only shoes that are from Converse and size 8 ", async function () {
// //             let search_for_shoe = Search(pool);

// //             let all_shoes = await search_for_shoe.search('Converse', 8);
// //             assert.equal(all_shoes.length, 1);
// //         });

// //     });

// describe("Add Brand Test", function () {
//     it("should be able to add brands in the database when a brand is added ", async function () {
//         let search_for_shoe = Search(pool);
//         await search_for_shoe.add_brands('New balance');

//         let brand = await search_for_shoe.brand();
//         assert.equal(brand.length, 1);
//     });
// });
// describe("Add Color Test", function () {
//     it("should be able to add colors in the database when a color is added ", async function () {
//         let search_for_shoe = Search(pool);
//         await search_for_shoe.add_colors('Black');

//         let color = await search_for_shoe.color();
//         assert.equal(color.length, 1);
//     });
// });
// describe("Add Size Test", function () {
//     it("should be able to add size in the database when a size is added ", async function () {
//         let search_for_shoe = Search(pool);
//         await search_for_shoe.add_sizes(7);

//         let color = await search_for_shoe.size();
//         assert.equal(color.length, 1);
//     });
// });
// describe("Add Shoe Test", function () {
//     it("should be able to add a shoe in the database ", async function () {
//         let search_for_shoe = Search(pool);
//         await search_for_shoe.add_brands('New balance');
//         await search_for_shoe.add_colors('Black');
//         await search_for_shoe.add_sizes(7);
//         await search_for_shoe.extract({ });

//         let shoe = await search_for_shoe.results();
//         assert.equal(shoe.length, 1);
//     });
// });
// describe("Add Quantity Test", function () {
//     it("should be able to add a shoe in the database and if the shoe already exist should update the stock ", async function () {
//         let search_for_shoe = Search(pool);
//         await search_for_shoe.add_brands('New balance');
//         await search_for_shoe.add_colors('Black');
//         await search_for_shoe.add_sizes(7);
//         await search_for_shoe.extract({});

//         let shoe = await search_for_shoe.results();
//         assert.equal(shoe.length, 1);
//     });
// });
// after(function () {
//     pool.end();
// });
// // });

