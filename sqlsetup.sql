use stuff;
DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
	description VARCHAR(5000),
	department ENUM('CMU','Electronics','Clothing','Food','Outdoors'),
	PRIMARY KEY(id)
);

INSERT INTO items VALUES (NULL, 'Pizza','I want that tartan pizza','CMU');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30),
	password VARCHAR(30),
	PRIMARY KEY (id)
);

INSERT INTO users VALUES (NULL, 'admin','password');

DROP TABLE IF EXISTS bids;
CREATE TABLE bids (
	id INT NOT NULL AUTO_INCREMENT,
	itemID INT,
	userID INT,
	price DECIMAL(20,2),
	PRIMARY KEY (id)
);