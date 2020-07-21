class RetrieveData {
    SHOEVALIDATE = `SELECT * FROM shoes WHERE brand_key = $1 AND color_key = $2 AND size_key = $3`;
    UPDATESHOE = `UPDATE shoes SET qty = $1, price = $2 WHERE id = $3`;
    INSERTSHOE = `INSERT INTO shoes (brand_key, color_key, size_key, price,qty, img) VALUES ($1, $2, $3, $4, $5, $6)`;

    pool: any;
    Sql = new SqlQueries(this.pool);

    constructor(pool: any) {
        this.pool = pool;
    }

    async extract_data(data: any) {
        const items: any = (data);
        await this.Sql.add_brand(items.brand)
        await this.Sql.add_color(items.color)
        await this.Sql.add_size(items.size)

        let brand_id: number = await this.Sql.get_by_brand(items.brand)
        let color_id: number = await this.Sql.get_by_color(items.color)
        let size_id: number = await this.Sql.get_by_size(items.size)
        const image = 'placeholder.jpg';

        let check_for_shoe = await this.pool.query(this.SHOEVALIDATE, [brand_id, color_id, size_id])
        if (check_for_shoe.rowCount === 1) {
            let id: number = check_for_shoe.rows[0].id
            let qty: number = check_for_shoe.rows[0].qty
            await this.pool.query(this.UPDATESHOE, [items.qty + qty, items.price, id])
        } else {
            await this.pool.query(this.INSERTSHOE, [brand_id, color_id, size_id, items.price, items.qty, image])
        }

    }
}