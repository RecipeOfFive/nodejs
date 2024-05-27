const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

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
