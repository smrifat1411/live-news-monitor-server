const express = require("express");
const app = express();
const cors = require("cors");

const newsRouter = require("./routes/newsRouter");

const dbConnect = require("./db/connect");
const notFound = require("./middlewares/not-found");

const port = process.env.PORT || 5000;

app.use(cors())
app.use("/api/v1/newschannels", newsRouter);
app.use(notFound);

const start = async () => {
  try {
    const dbc = await dbConnect(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();


