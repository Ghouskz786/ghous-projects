const app = require("./src/app");
const mongoose = require("mongoose");
//deploying on vercel no need for it
// app.listen(3000, () => {
//   console.log("server is listening");
// });
module.exports = app;
