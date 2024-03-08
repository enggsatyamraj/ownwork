const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
require("./config/database").connectWithDb();
const route = require("./routes/route");
app.use("/api/v1", route);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
