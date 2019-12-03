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
    return {
        get_by_brand,
        get_by_color,
        get_by_size
    }
}