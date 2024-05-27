const express = require("express");
const pool = require("../common/data/dataConfig");
const router = express.Router();

router.get("/recipe/:foodId", async (req, res) => {
  const foodId = req.params.foodId; // 파라미터에서 food ID를 받아옴

  if (!foodId) {
    return res.status(400).send({ message: "Food ID is required" });
  }

  try {
    const connection = await pool.getConnection();
    const selectRecipeQuery = `
      SELECT recipeOrder, description, image
      FROM RECIPE
      WHERE food_id = ?
      ORDER BY recipeOrder ASC
    `;
    const [recipeDetailList] = await connection.query(selectRecipeQuery, [
      foodId,
    ]);
    connection.release();

    res.json(recipeDetailList); // JSON 형식으로 응답 반환
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
