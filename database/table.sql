CREATE TABLE brands_table (
    id SERIAL PRIMARY KEY,
    brand TEXT
);

CREATE TABLE colors_table (
    id SERIAL PRIMARY KEY,
    colour TEXT
);

CREATE TABLE shoes_table (
    id SERIAL PRIMARY KEY,
    brand_key INTEGER REFERENCES brands_table (id) ON DELETE CASCADE ON UPDATE CASCADE,
    color_key INTEGER REFERENCES colors_table (id) ON DELETE CASCADE ON UPDATE CASCADE,
    size INTEGER,
    price DECIMAL(10,2),
    img TEXT
);