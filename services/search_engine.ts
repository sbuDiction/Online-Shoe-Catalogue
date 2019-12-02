export default function search_engine(pool: any) {
    let cart = [];
    let brand_ref: number;
    let color_ref: number;
    let size_ref: number;


    const brand_and_size = async (brand: string, size: number): Promise<any> => {
        const brand_and_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}' AND size = '${size}'`);
        return brand_and_size.rows
    }
    const display_shoes = async () => {
        const stock: any = await pool.query(`SELECT * FROM shoes`);
        return stock.rows
    }
    const display_color = async (): Promise<any> => {
        const stock: any = await pool.query(`SELECT * FROM color`);
        return stock.rows
    }
    const display_size = async (): Promise<any> => {
        const stock: any = await pool.query(`SELECT * FROM size`);
        return stock.rows
    }
    const display_brand = async (): Promise<any> => {
        const stock: any = await pool.query(`SELECT * FROM brand`);
        return stock.rows
    }
    const search = async (): Promise<any> => {
        const grab_all: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key`);
        return grab_all.rows;
    }
    const size = async (size: number): Promise<any> => {
        const shoe_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE size = '${size}'`);
        return shoe_size.rows;
    }
    const brand = async (brand: string): Promise<any> => {
        const brand_name: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}'`);
        return brand_name.rows;
    }

    //add shoe
    const add_brand = async (brand: any) => {
        const retrive_brand: any = await pool.query(`SELECT * FROM brand WHERE brand = '${brand}';`)
        // brand_ref = retrive_brand.rows[0].id
        if (retrive_brand.rowCount > 0) {
            return true;
        }
        await pool.query(`INSERT INTO brand (brand) VALUES ('${brand}')`)
    }

    const add_color = async (color: any) => {
        const retrive_color: any = await pool.query(`SELECT * FROM color WHERE color = '${color}';`)
        // color_ref = retrive_color.rows[0].id

        if (retrive_color.rows.length !== 0) {
            return true;
        }
        await pool.query(`INSERT INTO color (color) VALUES ('${color}');`);
    }

    const add_size = async (size: any) => {
        const retrive_size: any = await pool.query(`SELECT * FROM size WHERE size = '${size}';`)
        // size_ref = retrive_size.rows[0].id
        if (retrive_size.rowCount > 0) {
            return true;
        }
        await pool.query(`INSERT INTO size (size) VALUES ('${size}')`);
    }




    //add to shopping cart
    const add_to_cart = async (shoe_id: number) => { }

    const extract_data = async (data: any) => {
        const items: any = Object.values(data);
        console.log(items);
        let brand_id: number;
        let color_id: number;
        let size_id: number;
        const image = 'No image';

        for (let x = 0; x < items.length; x++) {
            const element = items[x];
        }
        await add_brand([items[0]])
        await add_color([items[1]])
        await add_size([items[2]])
        let select_brand = await pool.query(`SELECT * FROM brand WHERE brand = $1`, [items[0]])
        let select_color = await pool.query(`SELECT * FROM color WHERE color = $1`, [items[1]])
        let select_size = await pool.query(`SELECT * FROM size WHERE size = $1`, [items[2]])
        brand_id = select_brand.rows[0].id
        color_id = select_color.rows[0].id
        size_id = select_size.rows[0].id
        let check_for_shoe = await pool.query(`SELECT * FROM shoes WHERE brand_key = $1 AND color_key = $2 AND size_key = $3`, [select_brand.rows[0].id, select_color.rows[0].id, select_size.rows[0].id])
        console.log(check_for_shoe.rows);
        if (check_for_shoe.rowCount === 1) {
            check_for_shoe.rows[0].id
            await pool.query(`UPDATE shoes SET price = $1 AND price = $2 WHERE id = $3`, [items[3], items[4] + 1, check_for_shoe.rows[0].id])
        }
        await pool.query(`INSERT INTO shoes (brand_key, color_key, size_key, price,qty, img) VALUES ($1, $2, $3, $4, $5, $6)`, [brand_id, color_id, size_id, items[3], items[4], image])

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
        cart: add_to_cart,
        extract: extract_data
    }
}
