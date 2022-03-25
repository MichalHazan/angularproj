const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require('fs');
const onlyUsers = require("./helpers/onlyUsers");

let PORT = 5000;
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(express.static("images"));
app.use(cors(corsOptions));

app.use(
  session({
    secret: "michalhazanshoosh",
    name: "michal",
    resave: true, //זוכר כל פעולה
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, //שנה
    },
  })
);
app.get("/", (req, res) => {
  res.send({ msg: "work", docsUrl: `http://localhost:${PORT}/products` });
});
app.get("/email/:email", (req, res) => {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(emailRegexp.test(req.params.email));
  if (!emailRegexp.test(req.params.email)) {
    return res.status(400).send({ err: "email is not right" });
  } else {
    res.send({ msg: "true" });
  }
});
/* CREATE THE RECEIPT FILE */
app.post("/receiptFile", onlyUsers, async (req, res) => {
  const { content } = req.body;
  fs.writeFile('Receipt.txt', content, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
      res.status(201).send('File is created successfully.');
  });

});

/* DOWNLOAD THE RECEIPT FILE */
app.get('/downloadReceip', function (req, res) {
  const file = `${__dirname}/Receipt.txt`;
  res.download(file, "Receipt.txt");
});


app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/cart", require("./routes/cart"));
app.use("/users", require("./routes/users"));
app.use("/order", require("./routes/order"));

app.listen(PORT, () => console.log(`rocking ${PORT} `));
