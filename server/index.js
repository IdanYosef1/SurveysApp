const express = require("express");
const app = express();
const { connectDB } = require("./Config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8001;

dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();

const routerUsers = require("./Routes/users");
app.use("/api/users", routerUsers);

const routerSurveys = require("./Routes/surveys");
app.use("/api/surveys", routerSurveys);

const routerAnswerings = require("./Routes/answerings");
app.use("/api/answerings", routerAnswerings);

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
