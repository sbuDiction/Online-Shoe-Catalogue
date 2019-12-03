export default function search_api(engine: any, sql: any) {

    const color_dropdown = async (req: any, res: any, next: any) => {
        try {
            let color = await sql.display_color();
            res.json({
                status: 'success',
                data: color
            })
        } catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            })
        }
    }
    const brand_dropdown = async (req: any, res: any, next: any) => {
        try {
            let brand = await sql.display_brand();
            res.json({
                status: 'success',
                data: brand
            })
        } catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            })
        }
    }

    const size_dropdown = async (req: any, res: any, next: any) => {
        try {
            let size = await sql.display_size();
            res.json({
                status: 'success',
                data: size
            })
        } catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            })
        }
    }

    const get_all_shoes = async (req: any, res: any) => {
        try {
            let stock: any = await engine.search_all();
            res.json({
                status: 'success',
                data: stock
            })
        } catch (error) {
            res.json({
                status: 'error',
                error: error.stack
            })
        }
    }

    const by_brand_and_size = async (req: any, res: any) => {
        try {
            const size: any = Number(req.params.size);
            const brand: any = req.params.brandname;
            let search_results: any = await engine.search(brand, size);
            res.json({
                status: 'success',
                shoes: search_results
            })
        } catch (error) {

        }
    }

    const by_band = async (req: any, res: any, next: any) => {
        try {
            const brand: any = req.params.brandname;
            let search_results: any = await engine.by_brand(brand)
            res.json({
                status: 'success',
                data: search_results
            })

        } catch (error) {
            next(error)
        }
    }

    const by_size = async (req: any, res: any, next: any) => {
        try {
            const size: number = req.params.size
            let search_results: any = await engine.by_size(size);
            res.json({
                status: 'success',
                data: search_results
            })
        } catch (error) {
            next(error)
        }
    }

    const add = async (req: any, res: any, next: any) => {
        try {

            let data: any = req.body;
            await engine.extract(data);

        } catch (error) {
            next(error)
        }
    }

    const add_to_cart = async (req: any, res: any, next: any) => {
        try {
            const shoe_id: number = req.params.id
        } catch (error) {
            next(error)
        }
    }

    const buy = (req: any, res: any, next: any) => {
        try {
            const sold: number = req.params.id;
        } catch (error) {
            next(error)
        }
    }

    return {
        color_dropdown,
        brand_dropdown,
        size_dropdown,
        all: get_all_shoes,
        brand_and_size: by_brand_and_size,
        brand: by_band,
        size: by_size,
        update: add,
        cart: add_to_cart,
        checkout: buy
    }
}