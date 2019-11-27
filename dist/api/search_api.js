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
function search_api(engine) {
    const color_dropdown = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let color = yield engine.color();
            res.json({
                status: 'success',
                data: color
            });
        }
        catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            });
        }
    });
    const brand_dropdown = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let brand = yield engine.brand();
            res.json({
                status: 'success',
                data: brand
            });
        }
        catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            });
        }
    });
    const size_dropdown = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let size = yield engine.size();
            res.json({
                status: 'success',
                data: size
            });
        }
        catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            });
        }
    });
    const get_all_shoes = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let stock = yield engine.search_all();
            res.json({
                status: 'success',
                data: stock
            });
        }
        catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            });
        }
    });
    const by_brand_and_size = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const size = req.params.id;
            const brand = req.params.id;
            let search_results = yield engine.search(brand, size);
            res.json({
                status: 'success',
                data: search_results
            });
        }
        catch (error) {
        }
    });
    return {
        color_dropdown,
        brand_dropdown,
        size_dropdown,
        all: get_all_shoes,
        brand_and_size: by_brand_and_size
    };
}
exports.default = search_api;
//# sourceMappingURL=search_api.js.map