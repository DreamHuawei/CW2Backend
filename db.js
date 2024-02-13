const MongoClient = require('mongodb').MongoClient;
const document = {
  "products":[
    {
      "id": 1001,
      "title": "Subject: English",
      "location": "<em>Location: <strong>London</em>",
      "price": 2000,
      "image": "Images/English.png",
      "availableInventory": 50,
      "rating": 4
    },
    {
      "id": 1002,
      "title": "Subject: Music",
      "location": "<em>Location: <strong>Edinburgh</em>",
      "price": 2900,
      "image": "Images/Music.png",
      "availableInventory": 20,
      "rating": 3
    },
    {
      "id": 1003,
      "title": "Subject: History",
      "location": "<em>Location: <strong>London</em>",
      "price": 1500,
      "image": "Images/History.png",
      "availableInventory": 30,
      "rating": 3
    },
    {
      "id": 1004,
      "title": "Subject: Politics",
      "location": "<em>Location: <strong>London</em>",
      "price": 3124,
      "image": "Images/Politics.png",
      "availableInventory": 32,
      "rating": 3
    },
    {
      "id": 1005,
      "title": "Subject: Math",
      "location": "<em>Location: <strong>London</em>",
      "price": 8047,
      "image": "Images/Math.png",
      "availableInventory": 56,
      "rating": 4
    },
    {
      "id": 1006,
      "title": "Subject: Geography",
      "location": "<em>Location: <strong>Sheffield</em>",
      "price": 5063,
      "image": "Images/Geography.png",
      "availableInventory": 16,
      "rating": 4
    },
    {
      "id": 1007,
      "title": "Subject: Biology",
      "location": "<em>Location: <strong>London</em>",
      "price": 8867,
      "image": "Images/Biology.png",
      "availableInventory": 8,
      "rating": 5
    },
    {
      "id": 1008,
      "title": "Subject: Chemistry",
      "location": "<em>Location: <strong>London</em>",
      "price": 8646,
      "image": "Images/Chemistry.png",
      "availableInventory": 9,
      "rating": 4
    },
    {
      "id": 1009,
      "title": "Subject: Chinese",
      "location": "<em>Location: <strong>Sheffield</em>",
      "price": 1245,
      "image": "Images/Chinese.png",
      "availableInventory": 18,
      "rating": 2
    },
    {
      "id": 1010,
      "title": "Subject: Meteorology",
      "location": "<em>Location: <strong>Edinburgh</em>",
      "price": 5342,
      "image": "Images/Meteorology.png",
      "availableInventory": 80,
      "rating": 4
    }
  ]
};
const url = 'mongodb+srv://772498016:clyAPP666@cluster0.h91zoqu.mongodb.net/'; // MongoDB 连接 URL
const client = new MongoClient(url);
async function main() {
  await client.connect();
  const db = client.db("mobileApp");
  const collection = db.collection('product');
  await collection.dropIndexes();
  await collection.createIndex(
  {"$**" : "text"}, 
  {"weights" : {
    "title" : 3,
    "location" : 2}})
  await collection.deleteMany({});
  for (var i = 0; i < document.products.length; i++) {
    await collection.insertOne(document.products[i]);
  }
  return 'done.';
}

main()
  .then(console.log('Connected.'))
  .catch(console.error)
  .finally(() => client.close());


  module.exports = url 