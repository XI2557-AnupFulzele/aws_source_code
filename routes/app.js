const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../database/db");
const port = 8080;

app.use(cors());
app.use(express.json());


// create todo
app.post('/addTodo', async (req, res) => {
  try {
    const { description, status } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description, status) VALUES ($1, $2) RETURNING *",
      [description, status],
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//get all todos

app.get("/getAllTodos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/getTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todos WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/updateTodoDescription/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description  } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2",
      [description, id]
    );

    res.json("Todo description updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//  update todo status 
app.put("/updateTodoStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status  } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.json("Todo status updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
      id
    ]);
    res.json("Todo deleted successfully!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`app is listing on port ${port}`);
})