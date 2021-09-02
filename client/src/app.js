require("dotenv").config();

const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");
const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.PORT;
const app = express();

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));
app.use(morgan(process.env.MORGAN_METHOD));
app.use(helmet());

app.get("/", (req, res) => {
    res.status(200).render("index", {
        layout: false
    });
})

app.listen(port, () => {
    console.log(`Solbond running at port: ${port}`);
});
