//file for all the queries will use for grabing data in the database
// export default function queries (pool: any)  {

export default function select_all_shoes(pool: any) {

    const show_all_query = async () => {
        const grab_all_shoes = await pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`)
        return grab_all_shoes.rows
    }

    return {
        select_all_shoes
    }
}

// export default class queries {
//     private pool: any;

//     constructor(pool: any) {
//         this.pool = pool
//     }

//     async select_all_shoes() {
//         const grab_all_shoes = await this.pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`)
//         return grab_all_shoes.rows
//     }
// }