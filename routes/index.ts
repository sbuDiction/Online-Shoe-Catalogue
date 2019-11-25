import search from '../services/search_engine'

export default class Routes {
    private pool: any;
    constructor(pool) {
        this.pool
    }

    engine = new search(this.pool)

    async index(req: any, res: any) {
        // this.engine.
        res.render('index')
    }

}