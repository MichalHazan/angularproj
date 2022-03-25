const router = require("express").Router();
const { SQL } = require("../dbconfig");
const onlyUsers = require("../helpers/onlyUsers");

// ---Is there cart open?
router.get("/isopencart", onlyUsers, async (req, res) => {
  try {
    const iscart = await SQL(`
    SELECT id from shopping_cart Where user_id = ${req.session.user.userID} AND isopen=1;
    `);
    console.log(iscart);
    if (iscart.length < 1) {
      return res.send({ msg: "no" });
    } else {
      return res.send({ msg: "yes" });
    }
  } catch (err) {
    res.send({ err: error.sqlMessage, error });
  }
});

// ---close/ open new shopping_cart
router.post("/shopping_cart", onlyUsers, async (req, res) => {
  if (req.query.isopen == 1) {
    try {
      await SQL(`
            insert into shopping_cart (user_id, isopen) 
            values (${req.session.user.userID}, 1) 
        `);
      res.send({ msg: "new shopping cart" });
    } catch (error) {
      res.send({ err: error.sqlMessage, error });
    }
  } else {
    try {
      await SQL(`
            UPDATE shopping_cart SET isopen = 0
            Where user_id = ${req.session.user.userID}
        `);
      res.send({ msg: "close shopping cart" });
    } catch (error) {
      res.send({ err: error.sqlMessage, error });
    }
  }
});
// ---get date shopping cart
router.get("/shopping_cart/date", async (req, res) => {
  try {
    const cartDate = await SQL(`
            SELECT cartDate From shopping_cart 
            WHERE user_id=${req.session.user.userID} AND isopen=1;
        `);
    res.send({ msg: Date(cartDate[0].cartDate) });
  } catch (error) {
    res.send({ err: "You dont have an open cart" });
  }
});
// show cart_products
router.get("/", onlyUsers, async (req, res) => {
  try {
    // const cartId=
    const cart = await SQL(`
         SELECT * FROM  cart_products
         inner join products on products.productID = cart_products.product_id
         WHERE cart_products.cart_id = (SELECT id from shopping_cart where shopping_cart.user_id=${req.session.user.userID}  AND shopping_cart.isopen=1)
         AND products.productName LIKE '${req.query.proname}%';
          `);
    console.log(cart);
    res.send(cart);
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});

// ---Add/remove to Cart
router.post("/", onlyUsers, async (req, res) => {
  const { id, amount } = req.body;
  if (amount < 1) {
    try {
      await SQL(`
            DELETE FROM cart_products
            WHERE product_id = ${id}
                `);
      res.send({ msg: "deleted" });
    } catch (error) {
      res.send({ err: error.sqlMessage, error });
    }
  } else {
    try {
      const cartID = await SQL(
        `SELECT id from shopping_cart where shopping_cart.user_id=${req.session.user.userID}  AND shopping_cart.isopen=1`
      );
      console.log(cartID[0].id);
      await SQL(`
          INSERT INTO cart_products
          (product_id, amount, cart_id)
          VALUES
          (${id},${amount},${cartID[0].id} )
              `);
      res.send({ msg: `add ${amount} of it` });
    } catch (error) {
      res.send({ err: error.sqlMessage, error });
    }
  }
});
// ---update amount
router.put("/plus", onlyUsers, async (req, res) => {
  const { id } = req.body;
  try {
    await SQL(`
            UPDATE cart_products
            SET amount = amount + 1
            WHERE product_id = ${id}
                `);
    res.send({ msg: "update" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ---update amount
router.put("/minus", onlyUsers, async (req, res) => {
  const { id } = req.body;
  try {
    await SQL(`
            UPDATE cart_products
            SET amount = amount - 1
            WHERE product_id = ${id}
                `);
    res.send({ msg: "update" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// ---delete all product
router.delete("/deleteall", onlyUsers, async (req, res) => {
  try {
    const cartID = await SQL(
      `SELECT id from shopping_cart where shopping_cart.user_id=${req.session.user.userID}  AND shopping_cart.isopen=1`
    );
    await SQL(`
            Delete From cart_products
            WHERE cart_id = ${cartID[0].id}
                `);
    res.send({ msg: "all deleted" });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});

module.exports = router;
