export default class search_engine {
    private pool: any;
    constructor(pool: any) {
        this.pool = pool;
    }
    async search(): Promise<any> {
        const grab_all: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`);
        return grab_all.rows;
    }
    async size(size: number): Promise<any> {
        const shoe_size: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE size = '${size}'`);
        return shoe_size.rows;
    }
    async brand(brand: string): Promise<any> {
        const brand_name: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}'`);
        return brand_name.rows;
    }
    async brand_and_size(brand: string, size: number): Promise<any> {
        const brand_and_size: any = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}' AND size = '${size}'`);
        return brand_and_size.rows;
    }
}
