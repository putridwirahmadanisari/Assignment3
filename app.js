const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// app.listen(PORT, () => {
//   console.log(`Running on http://localhost:${PORT}`);
// });

module.exports = app;
