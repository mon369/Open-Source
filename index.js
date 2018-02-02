
const express = require('express');
const app = express();
const parser = require('./parse.js');
var multer = require('multer');
const HTTP_PORT = process.env.PORT || 8080;
const path = require("path");

const PATTERN = /[0-9]/g;


const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

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

app.post("/api/phonenumbers/parse/file", upload.single("parse"), (req, res) =>{
   
    res.send("You uploaded... " + req.file.filename);
})

app.use("*",  (req, res)=>{
    res.status(404).send("Can't Find What you're looking for");
})
app.listen(HTTP_PORT, ()=>{
    console.log("Running " + HTTP_PORT)
})