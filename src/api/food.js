const express = require("express");
const pool = require("../common/config/DataConfig");
const router = express.Router();

// 예시 api
router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const selectFoodQuery = "SELECT * FROM FOOD";
    const [foodList] = await connection.query(selectFoodQuery);
    console.log(foodList);
    connection.release();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
