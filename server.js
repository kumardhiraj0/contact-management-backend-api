const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express();

//connecting db function
connectDb();

const port = process.env.PORT || 5000;
//for parsing data from the body
app.use(express.json());
app.use("/api/contacts/", router);
app.use("/api/users/", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
