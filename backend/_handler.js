import express from 'express';
import { defaultHandler } from '@reshuffle/server-function';
import * as db from '@reshuffle/db';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const devDBAdmin = require('./_dev_db_admin');

const LINKS = 'links';
const connected = 'connected';

const app = express();
app.set('trust proxy', true);

// DEV ONLY: uncomment the follow line to admin your local or cloud DB (served this path: /dev-only/db-admin )
//devDBAdmin.initDevDBAdmin(app);

const allKeysQuery = db.Q.filter(db.Q.key.startsWith(''));
app.post('/go', express.urlencoded(), async (req, res) => {
    try {
        const key = req.body.text;
        db.update(connected, (prev_value) => { return 1; });
        const result = await db.get(`${LINKS}/${key}`)
        if(result){
            res.end(result);
        }else{
            res.end("No short link found, please use /set-go to set a short link");
        }
        
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});


app.post('/set-go', express.urlencoded(), async (req, res) => {
    try {
        const key = req.body.text;
        var result = key.split(" ");
        if(result[0] && result[1]){
            const name = result[0];
            const url = result[1];
            db.update(connected, (prev_value) => { return 1; });
            db.update(`${LINKS}/${name}`, (prev_value) => { return url; });
            res.end(`Setting ${name} to be ${url} `);
        }else{
            res.end(`Missing parameter. `);   
        } 
        
    } catch (e) {
        res.sendStatus(500);
        console.error(e);
    }
});


app.use(defaultHandler);

export default app;