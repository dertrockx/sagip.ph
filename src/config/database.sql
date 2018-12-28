-- Database User
DROP USER IF EXISTS 'sagipph'@'localhost';
CREATE USER 'sagipph'@'localhost' IDENTIFIED BY 'sagipph';

-- Datbase
DROP DATABASE IF EXISTS sagipph;
CREATE DATABASE sagipph;

-- Privileges
GRANT SUPER ON *.* TO 'sagipph'@'localhost';
GRANT ALL PRIVILEGES ON sagipph.* TO 'sagipph'@'localhost';
