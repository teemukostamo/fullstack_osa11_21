const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('./middleware/logger');

const { getPackageDictionary } = require('./controllers/packageReader');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(
    path.resolve(__dirname, '../client/build/', 'index.html'),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/api/packages', async (req, res) => {
  const packageDictionary = await getPackageDictionary('status.real');
  res.json(packageDictionary);
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.use(cors());
app.use(logger);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
