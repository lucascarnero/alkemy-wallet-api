const { User: Model, Account, Catalogue } = require("../models/");
const bcrypt = require("bcrypt");
const CustomError = require("../helpers/customerror");
const { ITEMS_PER_PAGE } = process.env;

const getAll = async (req, res, next) => {
  try {
    const total = await Model.count();

    let page = req.query.page ? Number(req.query.page) : 1;
    if (page <= 0) page = 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const entities = await Model.findAll({
      limit: Number(ITEMS_PER_PAGE),
      offset,
    });

    const response = {
      previousPage: page == 1 ? null : `/users/?page=${page - 1}`,
      nextPage:
        total > page * ITEMS_PER_PAGE ? `/users/?page=${page + 1}` : null,
      data: entities,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const entity = await Model.findByPk(id);

    if (!entity) throw new CustomError("Usuario inexistente", 404);

    return res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, points, roleId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const entity = await Model.create({
      first_name,
      last_name,
      email,
      password: passwordHash,
      points,
      roleId
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

    const { first_name, last_name, email, password, points } = req.body;
    let passwordHash;
    if (password) passwordHash = await bcrypt.hash(password, 10);

    await Model.update(
      {
        first_name,
        last_name,
        email,
        password: passwordHash,
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

const blockAccount = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { accountId } = req.params;

    const entity = await Account.findOne({
      where: {
        userId,
        id: accountId,
      },
    });
    if (!entity) throw new CustomError("No encontrado", 404);

    await Account.update(
      {
        isBlocked: true,
      },
      {
        where: {
          userId,
          id: accountId,
        },
      }
    );

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};

const unblockAccount = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { accountId } = req.params;

    const entity = await Account.findOne({
      where: {
        userId,
        id: accountId,
      },
    });
    if (!entity) throw new CustomError("No encontrado", 404);

    await Account.update(
      {
        isBlocked: false,
      },
      {
        where: {
          userId,
          id: accountId,
        },
      }
    );

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};

const exchangeProduct = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;

    const user = await Model.findByPk(userId);
    if (!user) throw new CustomError("Usuario inexistente", 400);

    const catalogueItem = await Catalogue.findByPk(productId);
    if (!catalogueItem) throw new CustomError("Producto inexistente", 400);

    // Validacion de puntos
    if (user.points < catalogueItem.points)
      throw new CustomError("No dispone de suficientes puntos", 403);

    user.points = Number(user.points) - Number(catalogueItem.points);

    await user.save();

    return res.status(200).json({ message: "OK" });
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
  blockAccount,
  unblockAccount,
  exchangeProduct,
};
