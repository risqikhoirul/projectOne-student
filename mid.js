const multer = require("multer");
const DiscordDatabase = require("discord-cloud-database");
const discordDatabase = new DiscordDatabase("ODg1MzQ4MDQ4Nzcxxxxx", { users: "1071443" });
exports.multerMiddleware = (req, res, next) => {
  const multerStorage = multer.memoryStorage();
  return multer({
    storage: multerStorage,
  }).single("photo");
};
exports.uploadImageMiddleware = async (req, res, next) => {
  try {
    const file = req.file;
    const image = await discordDatabase.uploadFile(file.buffer, file.originalname, { name: "users" });
    req.image = image;
    next();
  } catch (error) {
    next(error);
  }
};
