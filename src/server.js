const express = require("express");
const foodRouter = require("./api/food");

const app = express();
const port = 3000;

app.use(express.json());
app.use(`/food`, foodRouter);

app.get("/", (req, res) => {
  res.send(`<h2>welcome to server</h2>`);
});

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
