// const app = require('./app');
const port = process.env.PORT;

const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log("Server on port " + port);
});
