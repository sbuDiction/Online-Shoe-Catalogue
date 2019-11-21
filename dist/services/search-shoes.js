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
Object.defineProperty(exports, "__esModule", { value: true });
function find_all_shoes(pool) {
    const filter_all_shoes = () => __awaiter(this, void 0, void 0, function* () {
        let shoes = yield pool.query('SELECT * FROM shoes_table;');
        return shoes.rows;
    });
    return {
        all: filter_all_shoes,
    };
}
exports.default = find_all_shoes;
;
//# sourceMappingURL=search-shoes.js.map