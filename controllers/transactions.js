const { Transaction: Model } = require("../models");

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
    const { userId } = req.user;

    const entity = await Model.findOne({
      where: { id, userId },
    });

    if (!entity) return res.sendStatus(404);

    return res.status(200).json(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    const entities = await Model.findAll({
      where: {
        userId,
      },
      order: [["date", "DESC"]],
    });

    return res.status(200).json(entities);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const insert = async (req, res) => {
  try {
    const { amount, concept, date, type, accountId, userId, to_account_id } =
      req.body;

    const entity = await Model.create({
      amount,
      concept,
      date,
      type,
      accountId,
      userId,
      to_account_id,
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

    const { amount, concept, date, type, accountId, userId, to_account_id } =
      req.body;

    await Model.update(
      {
        amount,
        concept,
        date,
        type,
        accountId,
        userId,
        to_account_id,
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
  getByUserId,
  insert,
  update,
  remove,
};
