const foodsRouter = require("./api/foods");

module.exports = (app) => {
  app.use("/api/v1", foodsRouter);
};
