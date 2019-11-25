import search from '../services/search_engine'
// import { Pool } from 'pg';

// const engine = new search(Pool)

export default class Routes {


    async index(req: any, res: any, next: any) {
        // const engine = new search(this.pool)
        try {
            
            // console.log(engine.display_brand());
            res.render('index')

        } catch (error) {

            next(error)

        }
    }

}