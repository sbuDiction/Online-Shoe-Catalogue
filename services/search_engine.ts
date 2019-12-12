import sql from './sql';
export default function search_engine(pool: any) {
    let cart = [];
    let Sql = sql(pool)

    const brand_and_size = async (brand: string, size: number) => {
        const brand_and_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}' AND size = '${size}'`);
        return brand_and_size.rows
    }
    const search = async () => {
        const grab_all: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key`);
        return grab_all.rows;
    }
    const size = async (size: number) => {
        const shoe_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE size = '${size}'`);
        return shoe_size.rows;
    }
    const brand = async (brand: string) => {
        const brand_name: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}'`);
        return brand_name.rows;
    }

    const extract_data = async (data: any) => {
        const items: any = (data);
        await Sql.add_brand(items.brand)
        await Sql.add_color(items.color)
        await Sql.add_size(items.size)

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

    const add_to_cart = async (shoe_id: any) => {
        console.log(shoe_id);
        // let get_shoe: any = await pool.query(`SELECT * FROM shoes WHERE id = ${shoe_id.id}`)
        // let qty: any = get_shoe.rows[0].qty
        let check_stock = await pool.query(`SELECT * FROM cart WHERE shoe_id = $1`, [shoe_id.id])
        if (check_stock.rows.length !== 0) {
            let cart_qty = check_stock.rows[0].qty
            await pool.query(`UPDATE cart SET qty = $1 WHERE shoe_id = $2`, [cart_qty + 1, shoe_id.id])
        } else {

            await pool.query(`INSERT INTO cart (shoe_id,qty) VALUES ($1,$2)`, [shoe_id.id, 1])
        }
    }

    const display_counter = async () => {
        let count: any = await pool.query(`SELECT COUNT(*) FROM cart`);
        return count.rows[0].count
    }

    return {
        search: brand_and_size,
        search_all: search,
        by_size: size,
        by_brand: brand,
        cart: add_to_cart,
        extract: extract_data,
        count: display_counter
    }
}
