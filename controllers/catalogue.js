const { Catalogue: Model, User } = require("../models");
const { Op } = require("sequelize");
const { ITEMS_PER_PAGE } = process.env;

const getAll = async (req, res) => {
  try {
    const total = await Model.count();

    let page = req.query.page ? Number(req.query.page) : 1;
    if (page <= 0) page = 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const entities = await Model.findAll({
      limit: Number(ITEMS_PER_PAGE),
      offset,
      order: [["points", "DESC"]],
    });

    const response = {
      previousPage: page == 1 ? null : `/catalogue/?page=${page - 1}`,
      nextPage:
        total > page * ITEMS_PER_PAGE ? `/catalogue/?page=${page + 1}` : null,
      data: entities,
    };

    return res.status(200).json(response);
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
