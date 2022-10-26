const { Role: Model } = require("../models");
const CustomError = require("../helpers/customerror");

const getAll = async (req, res, next) => {
  try {
    const entities = await Model.findAll();
    return res.status(200).json(entities);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const entity = await Model.findByPk(id);

    if (!entity) throw new CustomError("No encontrado", 404);

    return res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const entity = await Model.create({
      name,
      description,
    });

    return res.status(201).send(entity);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entity = await Model.findByPk(id);
    if (!entity) throw new CustomError("No encontrado", 404);

    const { name, description } = req.body;

    await Model.update(
      {
        name,
        description,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send(entity);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const entity = await Model.findByPk(id);
    if (!entity) throw new CustomError("No encontrado", 404);

    await Model.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
