const { FixedTermDeposit: Model } = require("../models");
const { ITEMS_PER_PAGE } = process.env;
const CustomError = require("../helpers/customerror");

const getAll = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const total = await Model.count({
      where: {
        userId,
      },
    });

    let page = req.query.page ? Number(req.query.page) : 1;
    if (page <= 0) page = 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const entities = await Model.findAll({
      where: {
        userId,
      },
      limit: Number(ITEMS_PER_PAGE),
      offset,
      order: [["creation_date", "DESC"]],
    });

    const response = {
      previousPage: page == 1 ? null : `/fixeddeposits/?page=${page - 1}`,
      nextPage:
        total > page * ITEMS_PER_PAGE
          ? `/fixeddeposits/?page=${page + 1}`
          : null,
      data: entities,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const entity = await Model.findOne({
      where: { id, userId },
    });

    if (!entity) throw new CustomError("No encontrado", 404);

    return res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { accountId, amount, creation_date, closing_date } = req.body;

    const entity = await Model.create({
      userId,
      accountId,
      amount,
      creation_date,
      closing_date,
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

    const { userId, accountId, amount, creation_date, closing_date } = req.body;

    await Model.update(
      {
        userId,
        accountId,
        amount,
        creation_date,
        closing_date,
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
