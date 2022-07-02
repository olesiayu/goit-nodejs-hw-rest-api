const { uploadImage } = require("../services/image.service");
const { updateUser } = require("../services/user.service");

const updateAvatar = async (req, res, next) => {
  const { _id: id } = req.user;
  const avatarURL = await uploadImage(id, req.file);
  const user = await updateUser(id, { avatarURL });
  res.json(user);
};

module.exports = { updateAvatar };
