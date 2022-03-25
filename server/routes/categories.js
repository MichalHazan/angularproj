const router = require('express').Router()
const { SQL } = require("../dbconfig");


// ---show all categories
router.get("/", async (req, res) => {
    try {
      const products = await SQL(`
      SELECT *
      FROM categories
          `);
      res.send(products);
    } catch (error) {
      res.send({ err: error.sqlMessage, error });
    }
  });

module.exports = router