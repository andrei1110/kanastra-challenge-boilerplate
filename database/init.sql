CREATE TABLE IF NOT EXISTS bank_slip (
    id INT NOT NULL auto_increment,
    name VARCHAR(45) NOT NULL,
    government_id BIGINT NOT NULL,
    email VARCHAR(100) NOT NULL,
    debt_amount FLOAT NOT NULL,
    debt_due_date DATE NOT NULL,
    debt_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (id)
);