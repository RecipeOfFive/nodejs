const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/recipe/{id}:
 *    get:
 *      summary: "레시피 조리 방법 조회"
 *      description: "foodId를 주면 그에 맞는 recipe 반환"
 *      tags: [Recipe]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        "200":
 *          description: 정상적인 레시피 반환
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
 *                          [{
 *                              "order":1,
 *                              "description": 삶는다,
 *                              "image": "http~~"
 *                            }, {
 *                              "order":2,
 *                              "description": 데친다,
 *                              "image": "http~~",
 *                            },
 *                          ]
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectRecipeQuery = `
        SELECT R.recipeOrder, R.description, R.image
        FROM RECIPE AS R
        INNER JOIN FOOD AS F
        ON R.food = F.id
        WHERE F.id = ?
        ORDER BY R.recipeOrder ASC
    `;
  const [recipeDetailList] = await connection.query(selectRecipeQuery, [id]);
  connection.release();

  res.json(recipeDetailList); // JSON 형식으로 응답 반환
});

module.exports = router;
