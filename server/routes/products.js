const router = require("express").Router();
const { SQL } = require("../dbconfig");
const onlyUsers = require("../helpers/onlyUsers");
const onlyAdmin = require("../helpers/onlyAdmin");

// --my pictures // file:///C:/Users/97252/Documents/76%20קורס/angularproj/server/images/

// ---show all products
router.get("/", async (req, res) => {
  try {
    const products = await SQL(`
      SELECT *
      FROM products
      INNER JOIN categories ON  products.category_id = categories.categoryID
      Where productName LIKE '${req.query.proname}%'
          `);
    res.send(products);
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ---show  product by id
router.get("/one/:id", async (req, res) => {
  try {
    const product = await SQL(`
      SELECT *
      FROM products
      INNER JOIN categories ON  products.category_id = categories.categoryID
      Where productID =${req.params.id}
          `);
    res.send(product);
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ---show  products by category
router.get("/:categoryID", onlyUsers, async (req, res) => {
  try {
    const products = await SQL(`
      SELECT *
      FROM products
      INNER JOIN categories ON  products.category_id = categories.categoryID
      Where category_id = ${req.params.categoryID}
          `);
    res.send(products);
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});

// ----add product
router.post("/add", onlyAdmin, async (req, res) => {
  const { productName, category_id, price, image } = req.body;
  try {
    await SQL(`
    INSERT INTO products
    (productName, category_id, price, image)
    VALUES
    ('${productName}',${category_id},${price},'${image}')
          `);
    res.send({ msg: "add" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ----update product-----
router.put("/update/:id", onlyAdmin, async (req, res) => {
  const { productName, category_id, price, image } = req.body;
  try {
    await SQL(`
      UPDATE products
      SET productName='${productName}', category_id=${category_id},
      price=${price}, image='${image}'
      WHERE productID = ${req.params.id}
          `);
    res.send({ msg: "update" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ---delete product----
router.delete("/:id", onlyAdmin, async (req, res) => {
  try {
    await SQL(`
      DELETE FROM products
      WHERE productID = ${req.params.id}
          `);
    res.send({ msg: "deleted" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});

module.exports = router;
