const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;

const app = express();


app.use(expressMongoDb("mongodb://localhost/bicicletas"));
app.use(bodyParser.json());
app.use(cors());


app.get("/bicicletas", (req, res) => {
    req.db.collection("bicicletas").find().toArray((err, data) => {
        if (err) {
            console.log(res.status(500).send());
            console.log(err);
            res.status(500).send();
            return;
        }
        res.send(data);
    });
});

app.put('/bicicletas/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };
    req.db.collection('bicicletas').updateOne(query, req.body, (err, data) => {
        if (err) {
            console.log(res.status(500).send());
            console.log(err);
            res.status(500).send();
            return;
        }
    
        if (!data) {
            console.log(res.status(500).send());
            console.log(err);
            res.status(404).send();
            return;
        }
            res.send(data);
    });
})

app.post('/bicicleta', (req, res) => {
    let bicicleta = {
        cor: req.body.cor,
        marca: req.body.marca,
        aro: req.body.aro
    };
   
    req.db.collection('bicicletas').insert(bicicleta, (err, data) => {
        if(err) {
            console.log(res.status(500).send());
            console.log(err);
            res.status(500).send();
        }
    })
        
    
})

app.listen(process.env.PORT || 3000, () => console.log('Aplicação inicializada'));













