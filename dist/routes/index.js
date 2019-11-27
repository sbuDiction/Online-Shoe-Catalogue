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
function routes(engine) {
    const index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            let colors = yield engine.color();
            const sizes = yield engine.size();
            const brand = yield engine.brand();
            const results = yield engine.results();
            let shoe;
            results.forEach((element) => {
                shoe = element;
            });
            res.render('index', { brands: brand, colors: colors, size: sizes, results: shoe });
        }
        catch (error) {
            next(error);
        }
    });
    const search = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const color = req.body.color;
            const brands = req.body.brand;
            const size = Number(req.body.size);
            yield engine.search(brands, size);
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }
    });
    return {
        index,
        search
    };
}
exports.default = routes;
//# sourceMappingURL=index.js.map