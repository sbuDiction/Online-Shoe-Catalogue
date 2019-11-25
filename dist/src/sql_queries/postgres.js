"use strict";
//file for all the queries will use for grabing data in the database
// export default function queries (pool: any)  {
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
function select_all_shoes(pool) {
    const show_all_query = () => __awaiter(this, void 0, void 0, function* () {
        const grab_all_shoes = yield pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`);
        return grab_all_shoes.rows;
    });
    return {
        select_all_shoes
    };
}
exports.default = select_all_shoes;
// export default class queries {
//     private pool: any;
//     constructor(pool: any) {
//         this.pool = pool
//     }
//     async select_all_shoes() {
//         const grab_all_shoes = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`)
//         return grab_all_shoes.rows
//     }
// }
//# sourceMappingURL=postgres.js.map