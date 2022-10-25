const { Catalogue: Model, User } = require("../models");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  try {
    const entities = await Model.findAll({
      order: [["points", "DESC"]],
    });
    return res.status(200).json(entities);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const entity = await Model.findByPk(id);

    if (!entity) return res.sendStatus(404);

    return res.status(200).json(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const insert = async (req, res) => {
  try {
    const { product_description, image, points } = req.body;

    const entity = await Model.create({
      product_description,
      image,
      points,
    });

    return res.status(201).send(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Model.findByPk(id);
    if (!entity) return res.sendStatus(404);

    const { product_description, image, points } = req.body;

    await Model.update(
      {
        product_description,
        image,
        points,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const entity = await Model.findByPk(id);
    if (!entity) return res.sendStatus(404);

    await Model.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getByUserPoints = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);
    if (!user) return res.sendStatus(400);

    const userPoints = Number(user.points);

    console.log(userPoints);

    const entities = await Model.findAll({
      where: {
        points: {
          [Op.lte]: userPoints,
        },
      },
    });

    return res.status(200).json(entities);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
  getByUserPoints,
};
