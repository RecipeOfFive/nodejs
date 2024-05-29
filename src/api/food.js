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
 *                          { "name": "새우두부계란찜", "main_iamge": "http://www.foodsafetykorea.go.kr/uploadimg/cook/10_00028_2.png", "description": "맛있는 새우두부계란찜이예요", "like_count": 7, "view_count": 5, "type": "끓이기", "kind": "밥", "hashtag": "순두부" }
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectFoodDetailQuery = `
      SELECT name, main_image, description, like_count, view_count, type, kind, hashtag
      FROM FOOD
      WHERE id = ?`;
  const [foodDetail] = await connection.query(selectFoodDetailQuery, [id]);

  const updateViewCountQuery = `
    UPDATE FOOD
    SET view_count = view_count + 1
    WHERE id = ?
  `;
  await connection.query(updateViewCountQuery, [id]);

  connection.release();

  res.json(foodDetail[0]); // JSON 형식으로 응답 반환
});

/**
 * @swagger
 * paths:
 *  /api/food/like/{id}:
 *    get:
 *      summary: "좋아요 수 올리기"
 *      description: "foodId를 주면 그 요리의 좋아요 수 count 증가"
 *      tags: [Food]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        "204":
 *          description: 정상적으로 좋아요 수가 올라감
 */
router.get("/like/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const updateLikeCountQuery = `
    UPDATE FOOD
    SET like_count = like_count + 1
    WHERE id = ?
  `;
  await connection.query(updateLikeCountQuery, [id]);

  connection.release();

  res.sendStatus(204).end();
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

/**
 * @swagger
 * paths:
 *  /api/food/nutrient/{id}:
 *    get:
 *      summary: "음식 영양소 조회"
 *      description: "foodId를 주면 그에 맞는 nutrient 반환"
 *      tags: [Food]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        "200":
 *          description: 정상적인 영양소 반환
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
 *                          { "calorie": 1, "carbohydrate": 1, "protein": 1, "province": 1, "salt": 1 }
 */
router.get("/nutrient/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectNutrientQuery = `
      SELECT calorie, carbohydrate, protein, province, salt
      FROM FOOD
      WHERE id = ?`;
  const [nutrientList] = await connection.query(selectNutrientQuery, [id]);
  connection.release();

  res.json(nutrientList[0]); // JSON 형식으로 응답 반환
});

/**
 * @swagger
 *paths:
 *  /api/food:
 *    post:
 *      summary: "요리 리스트 조회"
 *      description: "필터링에 맞추어 해당하는 요리 리스트 반환 (include, exclude, type은 없으면 빈배열로 요청)"
 *      tags:
 *        - "Food"
 *      parameters:
 *        - in: "body"
 *          name: "body"
 *          description: "필터링 조건"
 *          required: true
 *          schema:
 *            type: object
 *            required:
 *              - order
 *            properties:
 *              order:
 *                type: string
 *              include:
 *                type: array
 *                items:
 *                  type: string
 *              exclude:
 *                type: array
 *                items:
 *                  type: string
 *              type:
 *                type: array
 *                items:
 *                  type: string
 *      responses:
 *        "200":
 *          description: 정상적인 요리 리스트 반환
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
 *                          [ { "id": 1, "name": "알랄라", "mainImage": "http~~",  "description": "저감 뭐시기", "type": "끓이기", "likeCount": 1, "viewCount": 2 } ]
 */
router.post("/", async (req, res) => {
  const body = req.body;
  const include = body.include;
  const exclude = body.exclude;
  const type = body.type;
  const order = body.order;

  const connection = await pool.getConnection();
  let selectFoodListQuery = `SELECT id, name, main_image, description, type, like_count, view_count FROM FOOD`;

  if (
    (include && include.length > 0) ||
    (exclude && exclude.length > 0) ||
    (type && type.length > 0)
  ) {
    selectFoodListQuery += ` WHERE`;

    let whereConditions = [];

    if (include && include.length > 0) {
      const includeConditions = include.map(
        (ingredient) => `ingredient LIKE '%${ingredient}%'`
      );
      whereConditions.push(`(${includeConditions.join(" AND ")})`);
    }

    if (exclude && exclude.length > 0) {
      const excludeConditions = exclude.map(
        (ingredient) => `ingredient NOT LIKE '%${ingredient}%'`
      );
      whereConditions.push(`(${excludeConditions.join(" AND ")})`);
    }

    if (type && type.length > 0) {
      const typeCondition = `type IN (${type.map((t) => `'${t}'`).join(",")})`;
      whereConditions.push(`(${typeCondition})`);
    }

    selectFoodListQuery += ` ${whereConditions.join(" AND ")}`;
  }

  if (order) {
    selectFoodListQuery += ` ORDER BY ${order} DESC`;
  }

  selectFoodListQuery += ` LIMIT 9`;

  console.log(selectFoodListQuery);
  const [foodList] = await connection.query(selectFoodListQuery);
  connection.release();

  res.json(foodList);
});

module.exports = router;
