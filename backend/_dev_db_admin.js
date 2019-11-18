import express from 'express';
import * as db from '@reshuffle/db';

/**
 * 
 * THIS IS NOT WHERE YOUR CODE GOES - do add code edit _handler.js in the backend folder.
 * 
 * How to enable this DB admin:
 * 1) Edit _hander.js in this folder
 * 2) Uncomment devDBAdmin.initDevDBAdmin(app);
 * 3) Remember to remove that line when going to prod!
 */


function initDevDBAdmin(app) {
    const allKeysQuery = db.Q.filter(db.Q.key.startsWith(''));
    app.get('/dev-only/db-admin', async (_, res) => {
        try {
            const result = await db.find(allKeysQuery);
            var output = `<html>
        <head>
            <script>
            function deleteElement(key){ 
                var conf = confirm("Delete "+key); 
                if(!conf) return;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = this.responseText;
                    setTimeout(function(){location.reload()},1000);
                    }
                };
                xhttp.open("POST", "./db-admin", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send('{"action":"DELETE","id":"'+key+'"}');
            }

            function updateElement(key){ 
                var conf = confirm("UPDATE "+key); 
                if(!conf) return;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = this.responseText;
                    setTimeout(function(){location.reload()},1000);
                    }
                };
                xhttp.open("POST", "./db-admin", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send('{"action":"UPDATE","id":"'+key+'", "value":'+document.getElementById(key).value+'}');
            }

            function newElement(){ 
                var conf = confirm("Create new entry?"); 
                if(!conf) return;
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("message").innerHTML = this.responseText;
                    setTimeout(function(){location.reload()},1000);
                    }
                };
                xhttp.open("POST", "./db-admin", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send('{"action":"CREATE","id":"'+document.getElementById("new_key").value+'", "value":'+document.getElementById("new_value").value+'}');
            }
            </script>

            <style>
            table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            }
            .button {
                background-color: #4CAF50; 
                border: none;
                color: white;
                padding: 5px;
                margin: 5px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 12px;
              }
              .delete{
                background-color: #f44336;
              }
            </style>
        </head>
        Hacky DB admin<br>
        <p id="message"></p>

        
        <table>
        <tr>
        <th>Key</th>
        <th>Value</th>
        <th>Actions</th>
        </tr>
        `
            for (var x = 0; x < result.length; x++) {
                output += `<tr><td>${result[x].key}</td><td><textarea id="${result[x].key}" rows="4" cols="50">${JSON.stringify(result[x].value)}</textarea>
        </td><td>
        <button class="button delete" onclick="deleteElement('${result[x].key}')">Delete</button>
        <button class="button update" onclick="updateElement('${result[x].key}')">Update</button>
        </td></tr>`;
            }
            output += `
            <tr>
        <td><input size=40 id="new_key" value="your-key" type=text></td>
        <td><textarea id="new_value" rows="4" cols="50">{}</textarea></td>
        <td><button class="button update" onclick="newElement()">create</button></td>
        </tr>
            </table></html>`;
            res.end(output);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });

    app.post('/dev-only/db-admin', express.json(), async (req, res) => {
        var id = req.body.id;
        var action = req.body.action;
        if(action=="DELETE"){
            const result = await db.remove(id);
            res.end(`DELETED: ${id}`);
        }else if(action =="UPDATE"){
            const value = req.body.value;
            const result = db.update(id, (prev_value) => { return value; });
            res.end(`UPDATED: ${id}`);
        }else if(action =="CREATE"){
            const value = req.body.value;
            const result = db.update(id, (prev_value) => { return value; });
            res.end(`CREATED: ${id}`);
        }else{
            res.end(`action ${action} not found`);
        }
        
    });


}

export { initDevDBAdmin };