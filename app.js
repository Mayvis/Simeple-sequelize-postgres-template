const express = require("express");
const app = express();
const cors = require("cors");
const initRouter = require("./src/routes");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 3000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router
initRouter(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
