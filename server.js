const express = require('express');
const authRouter = require("./src/routes/auth.router");
const postRouter = require("./src/routes/post.router");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();


const app = express();
app.use(bodyParser.json());
const port = 3000;

const prisma = new PrismaClient();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter)


app.listen(port, () => console.log(`app listening on port ${port}`))