// export default function search_engine(pool: any) {
//     let cart = [];
//     let Sql = new SqlQueries(pool)

//     const brand_and_size = async (brand: string, size: number) => {
//         const brand_and_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}' AND size = '${size}'`);
//         return brand_and_size.rows
//     }
//     const search = async () => {
//         const grab_all: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key`);
//         return grab_all.rows;
//     }
//     const size = async (size: number) => {
//         const shoe_size: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE size = '${size}'`);
//         return shoe_size.rows;
//     }
//     const brand = async (brand: string) => {
//         const brand_name: any = await pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}'`);
//         return brand_name.rows;
//     }



//     

//     const display_counter = async () => {
//         let count: any = await pool.query(`SELECT COUNT(*) FROM cart`);
//         return count.rows[0].count
//     }

//     return {
//         search: brand_and_size,
//         search_all: search,
//         by_size: size,
//         by_brand: brand,
//         cart: add_to_cart,
//         extract: extract_data,
//         count: display_counter
//     }
// }
class ShoeFinder {
    pool: any;
    Sql = new SqlQueries(this.pool)

    async brand_and_size(brand: string, size: number) {
        const brand_and_size: any = await this.pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key WHERE brand = '${brand}' AND size = '${size}'`);
        return brand_and_size.rows
    }


    async search() {
        const grab_all: any = await this.pool.query(`SELECT brand.brand,color.color,size.size,shoes.price,shoes.img,shoes.qty,shoes.id FROM brand INNER JOIN shoes ON brand.id = shoes.brand_key INNER JOIN color ON color.id = shoes.color_key INNER JOIN size ON size.id = shoes.size_key`);
        return grab_all.rows;
    }
}