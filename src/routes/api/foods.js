const router = require("express").Router();
const { body, param, query, validationResult } = require("express-validator");
const Food = require("../../db").Food;

router.get(
  "/foods",
  query("offset").optional().toInt().isNumeric(),
  query("limit").optional().toInt().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { offset, limit } = req.query;
      const { count, rows } = await Food.findAndCountAll({
        offset: !offset ? 0 : offset,
        limit: !limit ? 20 : limit,
      });

      return res
        .status(200)
        .json({ message: "ok", data: { foods: rows, total: count } });
    } catch (errors) {
      return res.status(400).json({ message: "error", errors });
    }
  }
);

router.get("/foods/:id", param("id").exists().isNumeric(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    const food = await Food.findOne({ where: { foodId: id } });
    if (!food) {
      return res.status(400).json({ message: "Can't find food🥲" });
    }

    return res.status(200).json({ message: "ok", data: food });
  } catch (errors) {
    return res.status(400).json({ message: "error", errors });
  }
});

router.post(
  "/foods",
  body("name").exists().isString(),
  body("type")
    .exists()
    .isString()
    .isIn(["vegetable", "fruit", "meat", "seafood"]),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, type } = req.body;

      const food = await Food.create({
        name,
        type,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      const { dataValues } = await food.save();
      return res.status(200).json({ message: "ok", data: dataValues });
    } catch (errors) {
      return res.status(400).json({ message: "error", errors });
    }
  }
);

router.put(
  "/foods/:id",
  param("id").exists().isNumeric(),
  body("name").exists().isString(),
  body("type")
    .exists()
    .isString()
    .isIn(["vegetable", "fruit", "meat", "seafood"]),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, type } = req.body;
      const { id: foodId } = req.params;
      const food = await Food.update(
        {
          name,
          type,
          updateAt: Date.now(),
        },
        {
          where: { foodId },
          returning: true,
        }
      );
      console.log(food[1]);
      if (food[1].length == 0)
        return res.status(200).json({ message: "data doesn't exist" });
      return res.status(200).json({ message: "ok", data: food[1] });
    } catch (errors) {
      return res.status(400).json({ message: "errors", errors });
    }
  }
);

router.delete(
  "/foods/:id",
  param("id").exists().isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id: foodId } = req.params;
      const food = await Food.destroy({
        where: { foodId },
        returning: true,
      });

      if (!food)
        return res.status(404).json({ message: "data doesn't exist" });
      return res.status(200).json({ message: "delete finished", data: food });
    } catch (errors) {
      //res.status(400).json({ message: "errors", errors });
      return res.status(400).json({ message: "errors", errors });
    }

    //return res.status(200).json({ message: "ok" });
  }
);

module.exports = router;
