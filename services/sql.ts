export default function sql(pool: any) {
    const get_by_brand = async (brand: string) => {
        let brands: any = await pool.query(`SELECT * FROM brand WHERE brand = $1`, [brand]);
        return brands.rows[0].id
    };
    const get_by_color = async (color: string) => {
        let colors: any = await pool.query(`SELECT * FROM color WHERE color = $1`, [color]);
        return colors.rows[0].id
    };
    const get_by_size = async (size: number) => {
        let sizes: any = await pool.query(`SELECT * FROM size WHERE size = $1`, [size]);
        return sizes.rows[0].id
    }
    const add_brand = async (brand: string) => {
        const retrive_brand: any = await pool.query(`SELECT * FROM brand WHERE brand = '${brand}';`)
        if (retrive_brand.rowCount > 0) {
            return true;
        }
        await pool.query(`INSERT INTO brand (brand) VALUES ('${brand}')`)
    }
    const add_color = async (color: string) => {
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
    const get_me_a_shoe = async (shoe_id: number) => {
        let shoe: any = await pool.query(`SELECT * FROM shoes WHERE id = $1`, [shoe_id]);
        return shoe.rows[0].id
    }
    return {
        get_by_brand,
        get_by_color,
        get_by_size,
        add_brand,
        add_color,
        add_size,
        display_brand,
        display_color,
        display_size,
        search_shoes: get_me_a_shoe
    }
}