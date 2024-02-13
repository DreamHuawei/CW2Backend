/* 介绍express模块:express是一个节点式web开发框架 */ 
const express = require('express');
const url = require('./db');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use('/Images', express.static('www'));

app.use((req, res, next) => {
    let ip = req.ip;
    let time = new Date().toLocaleString();
    let data = '访问时间：' + time + '    ip: ' + ip;
    console.log(data);
    next();
});
/* 引入cors来解决跨域问题 */
const cors = require('cors');
app.use(cors());

/* Introducing a body-parser form for parsing */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Listening port 8000 */ 
const port = process.env.PORT || 8000;
app.listen(port,() => {
    console.log('The service has been started on 8000 port!');
 })



 async function getLesson () {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("mobileApp");
    const collection = db.collection('product');
    let res = await collection.find().toArray();
    return res;
  }

app.get('/lesson', (req,res) => {
    getLesson().then((data)=>{res.json({code:1,msg:'success',data:data})})
});

async function saveOrder (document) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("mobileApp");
    const collection = db.collection('order');
    await collection.insertOne(document);
    return "ok";
  }

app.post('/order', (req,res) => {
    console.log(req.body);
    saveOrder(req.body).then((data)=>{res.json({code:1,msg:'success',data:data})})
});

async function updateNum (ids) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("mobileApp");
    const collection = db.collection('product');
    let result = await collection.find().toArray();
    let res = result;
    for (var i = 0; i < res.length; i++) {
        for (var j = 0; j < ids.length; j++) {
            if (res[i].id === ids[j]) {
                res[i].availableInventory = res[i].availableInventory - 1;
            }
        }
    }
    await collection.deleteMany({}); 
    console.log({products:res})
    for (var i = 0; i < res.length; i++) {
        await collection.insertOne(res[i]);
      }
    return "ok";
}
app.put('/num', (req,res) => {
    console.log(req.body.ids);
    updateNum(req.body.ids).then((data)=>{res.json({code:1,msg:'success',data:data})})
});

async function search (keyWord) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("mobileApp");
    const collection = db.collection('product');
    console.log(keyWord)
    let result = await collection.find({'title': {$regex: keyWord, $options: 'i'}}).toArray();
    return result;
}
app.get('/search', (req,res) => {
    console.log(req.query.keyWord);
    search(req.query.keyWord).then((data)=>{res.json({code:1,msg:'success',data:data})})
});






