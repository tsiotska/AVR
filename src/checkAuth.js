import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  return jwt.verify(req.headers.authorization, process.env.API_KEY, function (err, decoded) {
    if (err) {
      console.log(err.name);
      return res.send({
        auth: false,
        token: null,
        user: {username: null, email: null}
      })
    } else next();
  });
};
