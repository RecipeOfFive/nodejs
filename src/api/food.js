const express = require("express");
const pool = require("../common/data/dataConfig");
const router = express.Router();

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
