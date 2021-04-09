const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const itemsRouter = require('./routes/items');
const transaction_router = require("./routes/transactions")
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees.js')
const libRouter = require('./routes/libraries');
const loan_item_router = require('./routes/loanItem')
const paidfinesRouter = require('./routes/paidfines');
const notificationsRouter = require('./routes/notifications');
const waitinglistRouter = require('./routes/waitinglist');
const reportsRouter = require('./routes/reports');

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req,res,next)=>{
  console.log("middleware opening")
  res.header("Content-Range","objects 0-10/10" )
  next()
})
app.get('/', (req, res) => {
  res.json({'message': 'api ok'});
})

app.use("/api/transactions", transaction_router)
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/libraries', libRouter);
app.use('/api/loanitem',loan_item_router)
app.use('/api/paidfines', paidfinesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/waitinglist', waitinglistRouter);
app.use('/api/reports', reportsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
});