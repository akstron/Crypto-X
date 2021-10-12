require('dotenv').config();
const express = require('express');
const app = express();


const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});