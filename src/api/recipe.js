const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id; // 파라미터에서 food ID를 받아옴

  const connection = await pool.getConnection();
  const selectRecipeQuery = `
        SELECT recipeOrder, description, image
        FROM RECIPE
        WHERE id = ?
        ORDER BY recipeOrder ASC
    `;
  const [recipeDetailList] = await connection.query(selectRecipeQuery, [id]);
  connection.release();

  res.json(recipeDetailList); // JSON 형식으로 응답 반환
});

module.exports = router;
