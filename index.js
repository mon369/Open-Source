

const express = require('express');
const app = express();
const parser = require('./parse.js');
const HTTP_PORT = process.env.PORT || 8080;

const PATTERN = /[0-9]/g;


app.get("/api/phonenumbers/parse/text/:parse", (req, res) =>{
    let phoneNumber = req.params.parse.match(PATTERN);
    phoneNumber = phoneNumber.join("");
    let phone = [];
    parser.parse(phoneNumber).then((formattedNumber)=>{
        phone.push(formattedNumber);
        res.send(phone);
    }).catch((err) =>{
        phone.push(err)
        res.send(phone);
    })
})



app.get("/api/phonenumbers/parse/file", (req, res) =>{
    res.sendFile(__dirname + "/views/form.html");
})

app.use("*",  (req, res)=>{
    res.status(404).send("Can't Find What you're looking for");
})
app.listen(HTTP_PORT, ()=>{
    console.log("Running " + HTTP_PORT)
})