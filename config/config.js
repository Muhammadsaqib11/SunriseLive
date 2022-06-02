const mongoose = require("mongoose");
const uri =
  "mongodb+srv://HTWorkshop:HTWORKSHOP12@workshop.yobvs.mongodb.net/SunriseDev?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected with mongo db atlas");
  }
);

module.exports = mongoose;
