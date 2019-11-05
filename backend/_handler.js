import express from 'express';
import { defaultHandler } from '@reshuffle/server-function';
import * as db from '@reshuffle/db';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const LINKS = 'links';

const app = express();
app.set('trust proxy', true);
//app.use(express.json());

const allKeysQuery = db.Q.filter(db.Q.key.startsWith(''));

app.get('/list-keys', async (req, res) => {
    try {
        const result = await db.find(allKeysQuery);
        const keys = result.map(({ key }) => key);
        res.end(JSON.stringify(keys));
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});

app.get('/read/:key', async (req, res) => {
    try {
        const key = req.params.key;
        if (!key) {
            res.sendStatus(400);
            res.end("no key provided, please provide a key parameter");
            
        }else{
            const result = await db.get(key) || [];
            res.end(JSON.stringify(result));
        }    
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }

});

app.post('/create', express.json(), async (req, res) => {
    try {
        const key = req.body.key;
        const value = req.body.value;
        if (!key || !value) {
            res.sendStatus(400);
            res.end("no key/value provided, please provide a key/value parameter");
        }else{
            const created = await db.create(key, value);
            if(created == true){
                res.end(`created ${key}, ${value}`);
            }else{
                res.sendStatus(400);
                console.error(`key ${key} already exist`); 
            }
                
        }
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});

app.post('/update', express.json(), async (req, res) => {
    try {
        const key = req.body.key;
        const value = req.body.value;
        if (!key || !value) {
            res.sendStatus(400);
            console.error("no key/value provided, please provide a key/value parameter");  
        }else{
            db.update(key, (prev_value) => { return value; });
            res.end("updated");
        }
        
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});

app.get('/delete/:key', async (req, res) => {
    try {
        const key = req.params.key;
        if (!key) {
            res.sendStatus(400);
            res.end("no key provided, please provide a key parameter");  
        }else{
            const result = await db.remove(key);
            res.end("deleted");
        }    
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});


app.get('/swagger', async (req, res) => {
    swaggerDocument.host = req.get('host');
    if(req.protocol == "https"){
        swaggerDocument.schemes = ["https", "http"]
    }else{
        swaggerDocument.schemes = ["http", "https"]
    }
    res.end(JSON.stringify(swaggerDocument));
});


var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', function (req, res, next) {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    if(req.protocol == "https"){
        swaggerDocument.schemes = ["https", "http"]
    }else{
        swaggerDocument.schemes = ["http", "https"]
    }
    next();
}, swaggerUi.serve, swaggerUi.setup(null, options));


app.use(defaultHandler);

export default app;