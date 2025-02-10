SET datestyle TO "ISO, DMY";
create table company_types (
id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name text
);

create table partners (
id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
company_type int references company_types (id),
name text,
director text,
email text,
phone text,
address text,
tax_number text,
rating int
);

create table product_types 
(id int primary key generated always as identity,
name text);


create table products 
(id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
type int references product_types(id),
name text,
article text,
min_price float);

create table purchases (
id int primary key generated always as identity,
product_id int references products(id),
partner_id int references partners(id),
product_quantity bigint,
purchase_sale date);