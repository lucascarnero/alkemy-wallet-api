const express = require("express");
const logger = require("morgan");

const app = express();

require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());

/*******************************************************************************
 * Routes
 *******************************************************************************/
const userRoutes = require("./routes/users");
const roleRoutes = require("./routes/roles");
const accountRoutes = require("./routes/accounts");
const transactionRoutes = require("./routes/transactions");
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

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
