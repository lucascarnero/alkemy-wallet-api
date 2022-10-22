const { User: Model } = require("../models/");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  try {
    const entities = await Model.findAll();
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
    const { first_name, last_name, email, password, points } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const entity = await Model.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
      points,
      roleId: 2,
    });

    return res.status(201).send(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const entity = await Model.update(
      {
        first_name,
        last_name,
        email,
        password: passwordHash,
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

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
