const express = require("express");
const foodRouter = require("./api/food");
const recipeRouter = require("./api/recipe");
const path = require("path");
const { swaggerUi, specs } = require("./common/config/SwaggerConfig");
const cors = require("cors");

require("dotenv").config();

const whitelist = ["http://localhost:3000", process.env.AWS_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error(`Not Allowed Origin!`)); // cors 비허용
    }
  },
};

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "react",
      "recipe_of_five_front",
      "build",
      "index.html"
    )
  );
});

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
