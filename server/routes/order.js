const router = require("express").Router();
const { SQL } = require("../dbconfig");
const onlyUsers = require("../helpers/onlyUsers");

router.post("/", onlyUsers, async (req, res) => {
  const { sendCity, sendStreet, sendDate, payEnd } = req.body;
  if (!sendCity || !sendStreet || !sendDate || !payEnd) {
    return res.status(400).send({ err: "make sure you enterd all info" });
  }
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  if (!visaRegex.test(payEnd)) {
    return res.status(400).send({ err: "Visa is not right" });
  }
  try {
    const cart_id = await SQL(`
   SELECT * FROM  cart_products
   inner join products on products.productID = cart_products.product_id
   WHERE cart_products.cart_id = (SELECT id from shopping_cart where shopping_cart.user_id=${req.session.user.userID}  AND shopping_cart.isopen=1);
    `);
    console.log(cart_id);
    const last4Str = payEnd.slice(-4);
    const last4Num = Number(last4Str);
    console.log(last4Num);
    await SQL(`
              INSERT INTO orders
              (user_id,cart_id,sendCity, sendStreet, sendDate, payEnd)
              VALUES
              (${req.session.user.userID},"${cart_id}", "${sendCity}","${sendStreet}","${sendDate}","${last4Num}")
                  `);
    res.send({ msg: `Thank U` });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});

/** GET DATES with 3 ORDERS **/
router.get("/busydate", async (req, res) => {
  let q = `SELECT 
  sendDate 
  ,count(*) AS c
  FROM orders
  group by sendDate
  HAVING c>2`;
  try {
      const data = await SQL(q);
      res.status(200).json(data);
  } catch (err) {
      res.sendStatus(500);
      throw err;
  }

});
/** GET numbers of orders **/
router.get("/orders_num", async (req, res) => {
  let q = `SELECT COUNT(orderID) as number
  FROM orders;`;
  try {
      const data = await SQL(q);
      res.send({msg: data[0].number})
  } catch (err) {
    res.send({ err: error.sqlMessage, error });
      throw err;
  }

});


module.exports = router;
