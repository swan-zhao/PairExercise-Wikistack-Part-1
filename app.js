const morgan = require("morgan");
const express = require("express");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");
const layout = require("./views/layout");
const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

const { db, Page, User } = require("./models");
db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(layout(""));
});

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
const init = async () => {
  await db.sync();
  // await db.sync({force: true})

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
