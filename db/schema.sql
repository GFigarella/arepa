DROP DATABASE IF EXISTS eat_da_arepa_db;

CREATE DATABASE eat_da_arepa_db;
USE eat_da_arepa_db;

CREATE TABLE arepas(
    id INT NOT NULL AUTO_INCREMENT,
    filling VARCHAR(255) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY (id)
)