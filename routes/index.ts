export default function routes(engine: any) {
    const index = async (req: any, res: any, next: any) => {
        try {
            let colors: any = await engine.color()
            const sizes: any = await engine.size()
            const brand: any = await engine.brand()
            const results: any = await engine.results()
            let shoe: any;
            results.forEach((element: any) => {
                shoe = element
            });
            res.render('index', { brands: brand, colors: colors, size: sizes, results: shoe })
        } catch (error) {
            next(error)
        }
    }

    const search = async (req: any, res: any, next: any) => {
        try {
            const color: string = req.body.color;
            const brands: string = req.params.brand;
            const size: number = Number(req.params.size);

            await engine.search(brands, size);
            res.redirect('/')
        } catch (error) {
            next(error)
        }
    }
    return {
        index,
        search
    }
}
