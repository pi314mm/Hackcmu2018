create database stuff;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';