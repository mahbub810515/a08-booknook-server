import express from "express";

const app = express();

const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Homepage");
});

app.listen(PORT, () => {
    console.log(`Server started successfully at Port: ${PORT}`);
});