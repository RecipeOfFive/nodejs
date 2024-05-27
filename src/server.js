const express = require("express");
const foodRouter = require("./api/food");
const ingredientRouter = require("./api/ingredient");

const app = express();
const port = 3000;

app.use(express.json());
app.use(`/api/food`, foodRouter);
app.use("/api/ingredient", ingredientRouter);

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
