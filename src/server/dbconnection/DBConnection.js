const mongoose = require("mongoose");

module.exports = connectDb = () => {
    const password = "r4skU7oHlKYDiwn7";
    return mongoose.connect(`mongodb+srv://velianakirova:${password}@cluster0.rnn3cnw.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};