require("./configs/load_env");
require("./configs/db")();

const cors = require("cors");
const v1Routes = require("./routes/v1");

const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use("/api/v1", v1Routes);

app.use("*",(req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "An internal server error occurred" });
});

app.listen(PORT,function(){
  console.log(`Server is running on port ${PORT}`);
} );
