use stuff;
DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100),
	description VARCHAR(5000),
	department ENUM('CMU','Electronics','Clothing','Food','Outdoors'),
	PRIMARY KEY(id)
);

INSERT INTO TABLE items (name) VALUES ('Pizza');