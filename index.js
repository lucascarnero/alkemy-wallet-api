const express = require("express");
const logger = require("morgan");

const app = express();

require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());

/*******************************************************************************
 * Routes
 *
 *******************************************************************************/
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

(async () => {
  try {
    await app.listen(process.env.APP_PORT);
    console.log(
      `Servidor escuchando en http://localhost:${process.env.APP_PORT}`
    );
  } catch (error) {
    console.error("ERROR: " + error);
  }
})();
