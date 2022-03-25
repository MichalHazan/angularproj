const router = require("express").Router();
const { SQL } = require("../dbconfig");
const onlyUsers = require("../helpers/onlyUsers");
const bcrypt = require("bcrypt");

// ---register
router.post("/register", async (req, res) => {
  const { userID, firstName, lastName, email, password, city, street } =
    req.body;
  if (
    !userID ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !city ||
    !street
  ) {
    return res.status(400).send({ err: "make sure you enterd all info" });
  }
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(emailRegexp.test(email));
  if (!emailRegexp.test(email)) {
    return res.status(400).send({ err: "email is not right" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await SQL(`
            INSERT INTO users
            (userID, firstName, lastName, email, password, city, street)
            VALUES
            (${userID},"${firstName}", "${lastName}","${email}","${hashedPassword}","${city}","${street}")
                `);
    res.send({
      msg: `Welcome ${firstName} for your fisrt shopping`,
      firstName
    });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// --login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ err: "make sure you enterd all info" });
  }

  try {
    const user = await SQL(`
            SELECT * FROM users
            WHERE email= "${email}" `);
    if (
      user.length < 1 ||
      !(await bcrypt.compare(password, user[0].password))
    ) {
      return res.status(401).send({ err: "wrong password or username" });
    }
    req.session.user = user[0];
    res.send({ msg: `Welcome ${req.session.user.firstName}`, firstName: req.session.user.firstName });
  } catch (error) {
    res.send({ err: error.sqlMessage, error });
  }
});
// --logOut
router.delete("/logout", (req, res) => {
  req.session.destroy();
  res.send({ msg: "bye bye" });
});
router.get("/", onlyUsers, (req, res) => {
  res.send(req.session.user);
});
// ---מידע על יוזר מחובר
router.get("/user", onlyUsers, async (req, res) => {
  try {
    const user = await SQL(`
            SELECT * FROM users
            WHERE email= "${req.session.user.email}" `);
    res.send(user);
  } catch (err) {
    res.send({ err: error.sqlMessage, error });
  }
});

module.exports = router;
