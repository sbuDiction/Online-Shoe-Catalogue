// import queries from '../src/sql_queries/postgres'

export default function find_all_shoes(pool: any) {
    // const import_query = queries(pool)

    const filter_all_shoes = async (): Promise<any> => {
        let shoes = await pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key`)
        return shoes.rows
    }

    const filter_by_size = async (size: number): Promise<any> => {
        const get_by_size = await pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE size = '${size}'`)
        return get_by_size.rows
    }

    const filter_by_brand = async (brand: string): Promise<any> => {
        const get_by_brand = await pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}'`)
        return get_by_brand.rows
    }


    const filter_by_brand_and_size = async (brand: string, size: number): Promise<any> => {
        const get_by_both = await pool.query(`SELECT brands_table.brand,colors_table.colour,size_table.size,shoes_table.price,shoes_table.img FROM brands_table INNER JOIN shoes_table ON brands_table.id = shoes_table.brand_key INNER JOIN colors_table ON colors_table.id = shoes_table.color_key INNER JOIN size_table ON size_table.id = shoes_table.size_key WHERE brand = '${brand}' AND size = '${size}'`)
        return get_by_both.rows
    }
    return {
        all: filter_all_shoes,
        by_size: filter_by_size,
        by_brand: filter_by_brand,
        brand_and_size: filter_by_brand_and_size
    }
};
