export default function find_all_shoes(pool: any) {

    const filter_all_shoes = async (): Promise<any> => {
        let shoes = await pool.query('SELECT * FROM shoes_table;')
        return shoes.rows
    }

    return {
        all: filter_all_shoes,
    }
};