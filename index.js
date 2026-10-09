const express = require("express");
const dotenv = require("dotenv");
const bikeRoutes = require("./routes/bike");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/bikes", bikeRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Bike Rental API is working"
    });
});


app.use((req, res) => {
    res.status(404).json({
        message: "Page not found"
    });
});

app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log("Server listening on " + PORT);
});