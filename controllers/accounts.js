const { Account: Model, Transaction, User } = require("../models");
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
    });

    const response = {
      previousPage: page == 1 ? null : `/accounts/?page=${page - 1}`,
      nextPage:
        total > page * ITEMS_PER_PAGE ? `/accounts/?page=${page + 1}` : null,
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
    const { creationDate, money, isBlocked, userId } = req.body;

    const entity = await Model.create({
      creationDate,
      money,
      isBlocked,
      userId,
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

    const { creationDate, money, isBlocked, userId } = req.body;

    await Model.update(
      {
        creationDate,
        money,
        isBlocked,
        userId,
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

const makeDepositOrTransfer = async (req, res) => {
  try {
    // Usuario receptor si es un deposito
    // Originante si es una transfer
    const { userId } = req.user;
    // Cuenta receptora siempre
    const { accountId } = req.params;

    const { type, concept, amount } = req.body;

    if (type === "topup") {
      // Deposito
      // Validar cuenta
      const destinationAccount = await Model.findOne({
        where: {
          userId,
          id: accountId,
        },
      });

      if (!destinationAccount) return res.sendStatus(404);

      // Verifico que la cuenta no este bloqueada
      if (destinationAccount.isBlocked) return res.sendStatus(403);

      // Depositar el saldo
      destinationAccount.money += amount;
      await destinationAccount.save();

      // Registrar transaccion
      await Transaction.create({
        amount,
        concept,
        type,
        accountId,
        to_account_id: accountId,
        userId,
        date: new Date().toString(),
      });

      // Sumar 2% de saldo en puntos al usuario
      const user = await User.findByPk(userId);
      const points = Math.ceil(amount * 0.2);
      user.points += points;
      await user.save();

      return res.status(200).json({ message: "OK" });
    } else if (type === "payment") {
      // Transferencia
      // Validar cuenta  origen
      const originationAccount = await Model.findOne({
        where: {
          userId,
        },
      });
      if (!originationAccount) return res.sendStatus(404);

      // Validar cuenta receptora
      const destinationAccount = await Model.findOne({
        where: {
          id: accountId,
        },
      });
      if (!destinationAccount) return res.sendStatus(404);

      // Verificar que las cuentas no esten bloqueadas
      if (originationAccount.isBlocked) return res.sendStatus(403);
      if (destinationAccount.isBlocked) return res.sendStatus(403);

      // Verificar saldo en cuenta origen
      if (originationAccount.money < amount) return res.sendStatus(400);

      // Quitar saldo de cuenta origen
      originationAccount.money =
        Number(originationAccount.money) - Number(amount);
      originationAccount.save();

      // Depositar saldo en cuenta destino
      destinationAccount.money =
        Number(destinationAccount.money) + Number(amount);
      await destinationAccount.save();

      // Registrar transaccion
      await Transaction.create({
        amount,
        concept,
        type,
        accountId: originationAccount.id,
        to_account_id: destinationAccount.id,
        userId,
        date: new Date().toString(),
      });

      // Sumar 3% de saldo en puntos al usuario
      const user = await User.findByPk(userId);
      const points = Math.ceil(amount * 0.3);
      user.points += points;
      await user.save();

      return res.status(200).json({ message: "OK" });
    } else {
      return res.status(400).json({ message: "Tipo de transaccion no valido" });
    }
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
  makeDepositOrTransfer,
};
