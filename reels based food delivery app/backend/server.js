const app = require("./src/app.js");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_URI).then((data) => {
  app.listen(3000, () => {
    console.log("server is listening");
  });
});
