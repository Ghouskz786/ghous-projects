const app = require("./src/app");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  app.listen(3000, () => {
    console.log("server is listening");
  });
});
