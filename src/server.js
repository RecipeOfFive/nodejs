const express = require("express");
const foodRouter = require("./api/food");
const recipeRouter = require("./api/recipe");
const { swaggerUi, specs } = require("./common/config/SwaggerConfig");

const app = express();
const port = 3000;

app.use(express.json());
app.use(`/api/food`, foodRouter);
app.use(`/api/recipe`, recipeRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
  res.status(500);
  res.json({ message: err.message });
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
