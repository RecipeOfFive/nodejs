const express = require("express");
const foodRouter = require("./api/food");
const recipeRouter = require("./api/recipe");

const app = express();
const port = 3000;

app.use(express.json());
app.use(`/api/food`, foodRouter);
app.use(`/api/recipe`, recipeRouter);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
