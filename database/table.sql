CREATE TABLE brand (id SERIAL PRIMARY KEY, brand TEXT);

CREATE TABLE color (id SERIAL PRIMARY KEY, color TEXT);

CREATE TABLE size (id SERIAL PRIMARY KEY, size INTEGER);

CREATE TABLE shoes (
    id SERIAL PRIMARY KEY,
    brand_key INTEGER REFERENCES brand (id) on delete cascade on update cascade,
    color_key INTEGER REFERENCES color (id) on delete cascade on update cascade,
    size_key INTEGER REFERENCES size (id) on delete cascade on update cascade,
    price DECIMAL(10, 2),
    qty INTEGER,
    img TEXT
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    shoe_id INTEGER REFERENCES shoes(id) on delete cascade on update cascade,
    qty INTEGER
);