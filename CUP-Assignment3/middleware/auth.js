const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    //make sure the token is valid and has not expired
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    // _id : decoded._id, 'tokens.token': token -- finds a user with this id and check the token is present in the tokens array or not
    const user = await UserModel.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    //if user is found then make the route handler work
    //give the route handler access to the user tht we found from the db
    req.token = token; // if user has multiple login sessions , only this session gets logged out
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate ." });
  }
};

module.exports = auth;
