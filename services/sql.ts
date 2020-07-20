class SqlQueries {
    pool: any;

    // sql queries for usage later on in the project.
    SELECTFROMBRAND = `SELECT * FROM brand WHERE brand = $1`;
    SELECTFROMCOLOR = `SELECT * FROM color WHERE color = $1`;
    SELECTFROMSIZE = `SELECT * FROM size WHERE size = $1`;
    INSERTBRAND = `INSERT INTO brand (brand) VALUES ($1)`;
    INSERTCOLOR = `INSERT INTO color (color) VALUES ($1)`;
    INSERTSIZE = `INSERT INTO size (size) VALUES ($1)`;
    LISTCOLORS = `SELECT * FROM color`;
    LISTSIZE = `SELECT * FROM size`;
    LISTBRAND = `SELECT * FROM brand`;
    GETSHOEID = `SELECT * FROM shoes WHERE id = $1`;


    constructor(pool: any) {
        this.pool = pool;
    }

    async get_by_brand(brand: String) {
        let brands: any = await this.pool.query(this.SELECTFROMBRAND, [brand]);
        return brands.rows[0].id
    }

    async get_by_color(color: String) {
        let colors: any = await this.pool.query(this.SELECTFROMCOLOR, [color]);
        return colors.rows[0].id
    }

    async get_by_size(size: number) {
        let sizes: any = await this.pool.query(this.SELECTFROMSIZE, [size]);
        return sizes.rows[0].id
    }

    async add_brand(brand: string) {
        const retrive_brand: any = await this.pool.query(this.SELECTFROMBRAND, [brand])
        if (retrive_brand.rowCount > 0) {
            return true;
        }

        await this.pool.query(this.INSERTBRAND, [brand])
    }


    async add_color(color: string) {
        const retrive_color: any = await this.pool.query(this.SELECTFROMCOLOR, [color])
        if (retrive_color.rows.length !== 0) {
            return true;
        }
        await this.pool.query(this.INSERTCOLOR, [color]);
    }


    async add_size(size: any) {
        const retrive_size: any = await this.pool.query(this.SELECTFROMSIZE, [size])
        if (retrive_size.rowCount > 0) {
            return true;
        }
        await this.pool.query(this.INSERTSIZE, [size]);
    }

    async display_color() {
        const stock: any = await this.pool.query(this.LISTCOLORS);
        return stock.rows
    }

    async display_size() {
        const stock: any = await this.pool.query(this.LISTSIZE);
        return stock.rows
    }

    async display_brand() {
        const stock: any = await this.pool.query(``);
        return stock.rows
    }

    async get_me_a_shoe(shoe_id: number) {
        let shoe: any = await this.pool.query(this.GETSHOEID, [shoe_id]);
        return shoe.rows[0].id
    }

    get_pool() {
        return this.pool;
    }
}