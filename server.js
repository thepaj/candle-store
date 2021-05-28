const express = require('express')
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

app.get('/products', (req, res) => {
    let products = [];
    for(let i = 0; i < 10; i++) {
        let Product = {
            name: `Candle ${i}`
        };
        products.push(Product)
    }
    res.send(products);
});

app.get('/products/:productId', (req, res) => {
    let Product = {
        name: `Candle ${req.params.productId}`,
        desc: 'Nice smelling candle',
        price: `30$`,
    };
    res.send(Product)
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});