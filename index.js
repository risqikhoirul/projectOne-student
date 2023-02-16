const express = require("express");
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { multerMiddleware, uploadImageMiddleware } = require("./mid");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

router
  .route("/")
  .get((req, res, next) => {
    res.status(200).json({
      status: "success",
    });
  })
  .post(
    multerMiddleware(),
    uploadImageMiddleware,
    catchAsync(async (req, res, next) => {
      try {
        // kode untuk mengakses Discord Cloud Database
        res.status(200).json({
          status: "success",
          data: {
            image: req.image.url,
          },
        });
      } catch (error) {
        next(error);
      }
    })
  );

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    errObj: err,
  });
});

app.listen(3000, () => console.log("server run"));
