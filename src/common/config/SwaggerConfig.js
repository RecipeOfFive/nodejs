const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "레시피 조회 서비스 api",
      description: "재료를 통해서 레시피를 조회하는 냉장고 파먹기 유사 서비스",
    },
    servers: [
      {
        url: "http://recipeoffive.site",
      },
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/api/*.js"], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
