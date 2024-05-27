const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

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
