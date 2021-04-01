const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const itemsRouter = require('./routes/items');
const transaction_router = require("./routes/transactions")
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees.js')

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/api/transactions", transaction_router)
app.get('/', (req, res) => {
  res.json({'message': 'api ok'});
})

app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/employees', employeesRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
});