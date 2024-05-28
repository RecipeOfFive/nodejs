const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/food/{id}:
 *    get:
 *      summary: "음식 상세 내용 조회"
 *      description: "foodId를 주면 그에 맞는 음식 상세 내용 반환"
 *      tags: [Food]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        "200":
 *          description: 정상적인 음식 상세 내용 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          { "name": "새우두부계란찜", "main_iamge": "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00028_2.png", "description": "맛있는 새우두부계란찜이예요" }
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectFoodDetailQuery = `
      SELECT name, main_image, description
      FROM FOOD
      WHERE id = ?`;
  const [foodDetail] = await connection.query(selectFoodDetailQuery, [id]);
  connection.release();

  res.json(foodDetail[0]); // JSON 형식으로 응답 반환
});

/**
 * @swagger
 * paths:
 *  /api/food/ingredient/{id}:
 *    get:
 *      summary: "레시피 재료 조회"
 *      description: "foodId를 주면 그에 맞는 ingredient 반환"
 *      tags: [Food]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        "200":
 *          description: 정상적인 재료 반환
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          { "ingredient": "가지 1토막....." }
 */
router.get("/ingredient/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectIngredientQuery = `
      SELECT ingredient
      FROM FOOD
      WHERE id = ?`;
  const [ingredientList] = await connection.query(selectIngredientQuery, [id]);
  connection.release();

  res.json(ingredientList[0]); // JSON 형식으로 응답 반환
});

module.exports = router;
