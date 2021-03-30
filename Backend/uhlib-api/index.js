const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const itemsRouter = require('./routes/items');
const transaction_router = require("./routes/transactionRoute")
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/transactions", transaction_router)
app.get('/', (req, res) => {
  res.json({'message': 'api ok'});
})

app.use('/items', itemsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
});