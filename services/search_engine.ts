import sql from './sql';
export default function search_engine(pool: any) {
    let cart = [];
    let Sql = sql(pool)

    const brand_and_size = async (brand: string, size: number) => {
        const brand_and_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}' AND size = '${size}'`);
        return brand_and_size.rows
    }
    const display_shoes = async () => {
        const stock: any = await pool.query(`SELECT * FROM shoes`);
        return stock.rows
    }
    const display_color = async () => {
        const stock: any = await pool.query(`SELECT * FROM color`);
        return stock.rows
    }
    const display_size = async () => {
        const stock: any = await pool.query(`SELECT * FROM size`);
        return stock.rows
    }
    const display_brand = async () => {
        const stock: any = await pool.query(`SELECT * FROM brand`);
        return stock.rows
    }
    const search = async () => {
        const grab_all: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key`);
        return grab_all.rows;
    }
    const size = async (size: number) => {
        const shoe_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE size = '${size}'`);
        return shoe_size.rows;
    }
    const brand = async (brand: string) => {
        const brand_name: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}'`);
        return brand_name.rows;
    }

    //add shoe
    const add_brand = async (brand: any) => {
        const retrive_brand: any = await pool.query(`SELECT * FROM brand WHERE brand = '${brand}';`)
        if (retrive_brand.rowCount > 0) {
            return true;
        }
        await pool.query(`INSERT INTO brand (brand) VALUES ('${brand}')`)
    }

    const add_color = async (color: any) => {
        const retrive_color: any = await pool.query(`SELECT * FROM color WHERE color = '${color}';`)
        if (retrive_color.rows.length !== 0) {
            return true;
        }
        await pool.query(`INSERT INTO color (color) VALUES ('${color}');`);
    }

    const add_size = async (size: any) => {
        const retrive_size: any = await pool.query(`SELECT * FROM size WHERE size = '${size}';`)
        if (retrive_size.rowCount > 0) {
            return true;
        }
        await pool.query(`INSERT INTO size (size) VALUES ('${size}')`);
    }

    //add to shopping cart
    // const add_to_cart = async (shoe_id: number) => { }

    const extract_data = async (data: any) => {
        const items: any = (data);
        await add_brand(items.brand)
        await add_color(items.color)
        await add_size(items.size)

        let brand_id: number = await Sql.get_by_brand(items.brand)
        let color_id: number = await Sql.get_by_color(items.color)
        let size_id: number = await Sql.get_by_size(items.size)
        const image = 'placeholder.jpg';

        let check_for_shoe = await pool.query(`SELECT * FROM shoes WHERE brand_key = $1 AND color_key = $2 AND size_key = $3`, [brand_id, color_id, size_id])
        if (check_for_shoe.rowCount === 1) {
            let id: number = check_for_shoe.rows[0].id
            let qty: number = check_for_shoe.rows[0].qty
            await pool.query(`UPDATE shoes SET qty = $1, price = $2 WHERE id = $3`, [items.qty + qty, items.price, id])
        } else {
            await pool.query(`INSERT INTO shoes (brand_key, color_key, size_key, price,qty, img) VALUES ($1, $2, $3, $4, $5, $6)`, [brand_id, color_id, size_id, items.price, items.qty, image])
        }

    }


    return {
        search: brand_and_size,
        results: display_shoes,
        color: display_color,
        size: display_size,
        brand: display_brand,
        search_all: search,
        by_size: size,
        by_brand: brand,
        add_brands: add_brand,
        add_colors: add_color,
        add_sizes: add_size,
        // build: build_shoe,
        // cart: add_to_cart,
        extract: extract_data
    }
}
