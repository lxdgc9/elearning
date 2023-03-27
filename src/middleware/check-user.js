function checkUser(req, _res, next) {
  if (!req.user.hasAccess) {
    throw new FobiddenErr("Tài khoản bị từ chối");
  }
  next();
}

export { checkUser };
