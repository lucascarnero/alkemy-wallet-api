const { User: Model, Account, Catalogue } = require("../models/");
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

    const entity = await Model.findByPk(id);

    if (!entity) return res.sendStatus(404);

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

const blockAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    const { accountId } = req.params;

    const entity = await Account.findOne({
      where: {
        userId,
        id: accountId,
      },
    });
    if (!entity) return res.sendStatus(404);

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
    return res.status(500).json(error);
  }
};

const unblockAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    const { accountId } = req.params;

    const entity = await Account.findOne({
      where: {
        userId,
        id: accountId,
      },
    });
    if (!entity) return res.sendStatus(404);

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
    return res.status(500).json(error);
  }
};

const exchangeProduct = async (req, res) => {
  try {
    const { userId } = req.user;
    const { productId } = req.params;

    const user = await Model.findByPk(userId);
    if (!user) return res.sendStatus(400);

    const catalogueItem = await Catalogue.findByPk(productId);
    if (!catalogueItem) return res.sendStatus(404);

    // Validacion de puntos
    if (user.points < catalogueItem.points) return res.sendStatus(403);

    user.points = Number(user.points) - Number(catalogueItem.points);

    await user.save();

    return res.status(200).json({ message: "OK" });
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
  blockAccount,
  unblockAccount,
  exchangeProduct,
};
