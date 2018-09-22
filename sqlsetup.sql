use stuff;
DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
	description VARCHAR(5000),
	department ENUM('CMU','Electronics','Clothing','Food','Outdoors'),
	PRIMARY KEY(id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30),
	password VARCHAR(30),
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS bids;
CREATE TABLE bids (
	id INT NOT NULL AUTO_INCREMENT,
	itemID INT,
	userID INT,
	price DECIMAL(20,2),
	PRIMARY KEY (id)
);

INSERT INTO items VALUES (1, 'Meal Block','I want to buy a block from the Undergound at a lower price than normal','CMU');
INSERT INTO items VALUES (2, 'Pizza','Does anyone have free pizza?','CMU');
INSERT INTO items VALUES (3, 'Ultimate Brownies','Be that ultimate bro and buy me an ultimate brownie','CMU');
INSERT INTO items VALUES (4, '15122 Homework Answers','Backalley transactions only','CMU'); 

INSERT INTO users VALUES (1,'Freshman','');
INSERT INTO users VALUES (2,'Papa Johns','');
INSERT INTO users VALUES (3,'Morewood','');
INSERT INTO users VALUES (4,'Anonymous','');

INSERT INTO bids VALUES (NULL,1,1,6.50);
INSERT INTO bids VALUES (NULL,2,2,14);
INSERT INTO bids VALUES (NULL,3,3,2);
INSERT INTO bids VALUES (NULL,4,4,13371337);
