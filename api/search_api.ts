export default function search_api(engine: any) {


    const color_dropdown = async (req: any, res: any, next: any) => {


        try {
            let color = await engine.color();
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
            let brand = await engine.brand();
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
            let size = await engine.size();
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
            const size: any = req.params.id;
            const brand: any = req.params.id;
            let search_results: any = await engine.search(brand, size);
            res.json({
                status: 'success',
                data: search_results
            })
        } catch (error) {

        }
    }

    return {
        color_dropdown,
        brand_dropdown,
        size_dropdown,
        all: get_all_shoes,
        brand_and_size: by_brand_and_size

    }
}