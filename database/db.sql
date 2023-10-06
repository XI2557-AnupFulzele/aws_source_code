CREATE DATABASE todo_app;
CREATE TABLE todos(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  status BOOLEAN,
);
