const { Account: Model, Transaction, User } = require("../models");
const { ITEMS_PER_PAGE } = process.env;
const CustomError = require("../helpers/customerror");

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
      previousPage: page == 1 ? null : `/accounts/?page=${page - 1}`,
      nextPage:
        total > page * ITEMS_PER_PAGE ? `/accounts/?page=${page + 1}` : null,
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

    if (!entity) throw new Error("No encontrado", 404);

    return res.status(200).json(entity);
  } catch (error) {
    next(error);
  }
};

const insert = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { creationDate, money, isBlocked } = req.body;

    const entity = await Model.create({
      creationDate,
      money,
      isBlocked,
      userId,
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

const makeDepositOrTransfer = async (req, res, next) => {
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

      if (!destinationAccount)
        throw new CustomError("No se encontro cuenta destino", 404);

      // Verifico que la cuenta no este bloqueada
      if (destinationAccount.isBlocked)
        throw new CustomError("La cuenta destino esta bloqueada", 403);

      // Depositar el saldo
      destinationAccount.money = Number(destinationAccount.money) + Number(amount);
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

      return res
        .status(200)
        .json(new CustomError("Deposito realizado exitosamente", 200));
    } else if (type === "payment") {
      // Transferencia
      // Validar cuenta  origen
      const originationAccount = await Model.findOne({
        where: {
          userId,
        },
      });
      if (!originationAccount)
        throw new CustomError("No se encontro la cuenta origen", 404);

      // Validar cuenta receptora
      const destinationAccount = await Model.findOne({
        where: {
          id: accountId,
        },
      });
      if (!destinationAccount)
        throw new CustomError("No se encontro la cuenta destino", 404);

      // Verificar que las cuentas no esten bloqueadas
      if (originationAccount.isBlocked)
        throw new CustomError("La cuenta origen esta bloqueada", 403);
      if (destinationAccount.isBlocked)
        throw new CustomError("La cuenta destino esta bloqueada", 403);

      // Verificar saldo en cuenta origen
      if (originationAccount.money < amount)
        throw new CustomError(
          "La cuenta origen no tiene suficiente saldo",
          400
        );

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
      throw new CustomError("Tipo de transaccion no valido", 400);
    }
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
  makeDepositOrTransfer,
};
