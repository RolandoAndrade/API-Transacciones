CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  second_name VARCHAR,
  first_surname VARCHAR,
  second_surname VARCHAR,
  email VARCHAR
);

INSERT INTO users (first_name, second_name, first_surname, second_surname,email)
  VALUES ('Rolando', 'José', 'Andrade', 'Fernández','rolandoandradefernandez@gmail.com');

SELECT * FROM  users