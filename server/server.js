require('dotenv').config();
const express = require('express');
require('./config/connection');
const app = express();

const userAuthRouter = require('./routers/userAuthRouter');

app.use(express.json());

app.use(userAuthRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});