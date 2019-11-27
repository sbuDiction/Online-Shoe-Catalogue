"use strict";
// var results = [];
// let Brand: string;
// let Size: number;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default class search_engine {
//     private pool: any;
//     constructor(pool: any) {
//         this.pool = pool;
//     }
//     async search(): Promise<any> {
//         const grab_all: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`);
//         return grab_all.rows;
//     }
//     async size(size: number): Promise<any> {
//         const shoe_size: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE size = '${size}'`);
//         return shoe_size.rows;
//     }
//     async brand(brand: string): Promise<any> {
//         const brand_name: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}'`);
//         return brand_name.rows;
//     }
//     async brand_and_size(brand: string, size: number): Promise<any> {
//         Brand = brand
//         Size = size
//         const brand_and_size: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${Brand}' AND size = '${Size}'`);
//         // console.log(brand_and_size.rows);
//         // return brand_and_size.rows;
//         // brand_and_size.rows = results
//         results.push(brand_and_size.rows);
//         // console.log(results, 'array');
//     }
//     async display_brand(): Promise<any> {
//         const stock: any = await this.pool.query(`SELECT * FROM brands_table`);
//         // console.log(stock.rows);
//         return stock.rows
//     }
//     async display_size(): Promise<any> {
//         const stock: any = await this.pool.query(`SELECT * FROM size_table`);
//         return stock.rows
//     }
//     async display_color(): Promise<any> {
//         const stock: any = await this.pool.query(`SELECT * FROM colors_table`);
//         return stock.rows
//     }
//     async display_shoes() {
//         // const results = await this.brand_and_size(Brand, Size)
//         // console.log(results);
//         return results
//     }
// }
function search_engine(pool) {
    var results = [];
    let Brand;
    let Size;
    const brand_and_size = (brand, size) => __awaiter(this, void 0, void 0, function* () {
        Brand = brand;
        Size = size;
        const brand_and_size = yield pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${Brand}' AND size = '${Size}'`);
        results.push(brand_and_size.rows);
    });
    const display_shoes = () => __awaiter(this, void 0, void 0, function* () {
        return results;
    });
    const display_color = () => __awaiter(this, void 0, void 0, function* () {
        const stock = yield pool.query(`SELECT * FROM colors_table`);
        return stock.rows;
    });
    const display_size = () => __awaiter(this, void 0, void 0, function* () {
        const stock = yield pool.query(`SELECT * FROM size_table`);
        return stock.rows;
    });
    const display_brand = () => __awaiter(this, void 0, void 0, function* () {
        const stock = yield pool.query(`SELECT * FROM brands_table`);
        return stock.rows;
    });
    const search = () => __awaiter(this, void 0, void 0, function* () {
        const grab_all = yield pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`);
        return grab_all.rows;
    });
    const size = (size) => __awaiter(this, void 0, void 0, function* () {
        const shoe_size = yield this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE size = '${size}'`);
        return shoe_size.rows;
    });
    const brand = (brand) => __awaiter(this, void 0, void 0, function* () {
        const brand_name = yield this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}'`);
        return brand_name.rows;
    });
    return {
        search: brand_and_size,
        results: display_shoes,
        color: display_color,
        size: display_size,
        brand: display_brand,
        search_all: search,
        by_size: size,
        by_brand: brand
    };
}
exports.default = search_engine;
//# sourceMappingURL=search_engine.js.map