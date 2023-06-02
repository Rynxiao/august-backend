const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const sensesRouter = require('./routes/senses');
const typesRouter = require('./routes/types');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/api/senses', sensesRouter);
app.use('/api/types', typesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
