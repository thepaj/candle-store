const express = require('express')
const app = express();
const cors = require("cors");
const port = 5000;
const Product = require('./models/product');

const db = require('./utils/database');

db.execute('SELECT * FROM products')
    .then(result => console.log(result))
    .catch((err) => {
        console.error(err)
})

app.use(cors());

app.get('/products', async (req, res, next) => {
    let [rows, fieldData] = await Product.fetchAll();
    let products = [];
    for(let i = 0; i < rows.length; i++) {
        products.push(new Product(rows[i].id, rows[i].title, rows[i].imageUrl, rows[i].description, rows[i].price))
    }
    res.send(products);
});

app.get('/products/:productId', async (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId)
    let resultProduct = await Product.findById(prodId)
    res.send(resultProduct)
});

app.post('/admin/add-product', async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});