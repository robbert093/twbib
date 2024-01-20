const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

// force: true is used to recreate tables in db
// db.sequelize.sync({force: true}).then(() => {
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serverul rulează pe http://localhost:${PORT}`);
  });
});