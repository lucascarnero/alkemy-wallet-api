const { ROLE_ADMIN_ID } = process.env;

const isAdmin = (req, res, next) => {
  const { roleId } = req.user;

  if (roleId != ROLE_ADMIN_ID) return res.sendStatus(403);

  next();
};
