const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const itemsRouter = require('./routes/items');
const transaction_router = require("./routes/transations")
const usersRouter = require('./routes/users');
const loanitem_router = require("./routes/loanItem")

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

app.use("/transactions", transaction_router)
app.use("/loanitem", loanitem_router)
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
});