class BuyShoes {
    pool: any;

    SELECTCART = `SELECT * FROM cart WHERE shoe_id = $1`;
    UPDATECART = `UPDATE cart SET qty = $1 WHERE shoe_id = $2`;
    INSERTCART = `INSERT INTO cart (shoe_id,qty) VALUES ($1, $2)`;

    constructor(pool: any) {
        this.pool = pool
    }

    async add_to_cart(shoe_id: any) {
        console.log(shoe_id, "inside function");
        // let get_shoe: any = await pool.query(`SELECT * FROM shoes WHERE id = ${shoe_id.id}`)
        // let qty: any = get_shoe.rows[0].qty
        let check_stock = await this.pool.query(this.SELECTCART, [shoe_id.id])
        if (check_stock.rows.length !== 0) {
            let cart_qty = check_stock.rows[0].qty
            await this.pool.query(this.UPDATECART, [cart_qty + 1, shoe_id.id])
        } else {

            await this.pool.query(this.INSERTCART, [shoe_id.id, 1])
        }
    }
}