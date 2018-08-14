DROP DATABASE IF EXISTS shopping_list;
CREATE DATABASE shopping_list
ENCODING 'UTF-8'
LC_COLLATE 'ru_RU.UTF-8'
LC_CTYPE 'ru_RU.UTF-8';
 \c shopping_list;

CREATE TABLE catalogs (
  ID SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE purchases (
  ID SERIAL PRIMARY KEY,
  catalogId INTEGER REFERENCES catalogs(ID),
  name VARCHAR,
  quantity VARCHAR,
  cost VARCHAR,
  completed BOOLEAN DEFAULT false
);

INSERT INTO catalogs (name) VALUES
	('catalog1'),
	('catalog2'),
	('catalog3'),
	('catalog4');

INSERT INTO purchases (catalogId, name, quantity, cost, completed) VALUES
	(1, 'purchase 1', '2 шт', '100 р', false),
	(1, 'purchase 2', '3 шт', '100 р', false),
	(1, 'purchase 3', '3 шт', '100 р', true),
	(1, 'purchase 4', '3 шт', '100 р', false),
	(2, 'purchase 5', '3 шт', '100 р', false),
	(2, 'purchase 6', '3 шт', '100 р', false),
	(2, 'purchase 7', '2 шт', '100 р', true),
	(2, 'purchase 8', '2 шт', '100 р', false),
	(3, 'purchase 9', '2 шт', '100 р', true),
	(3, 'purchase 10', '1 шт', '100 р', false),
	(3, 'purchase 11', '1 шт', '100 р', true),
	(3, 'purchase 12', '1 шт', '100 р', true),
	(3, 'purchase 13', '1 шт', '100 р', true),
	(3, 'purchase 14', '1 шт', '100 р', false),
	(4, 'purchase 15', '2 шт', '100 р', false);
